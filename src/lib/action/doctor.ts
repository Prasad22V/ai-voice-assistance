"use server";

import { Gender } from "@prisma/client";
import prisma from "../prisma";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

interface createDoctorInput {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  gender: Gender;
  isActive: boolean;
}

interface updateDoctorInput extends Partial<createDoctorInput> {
  id: string;
}

export async function getDoctor() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: {
          select: {
            appoitments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appoitmentsCount: doctor._count.appoitments,
    }));
  } catch (error) {
    console.log("error getting doctors", error);
    throw new Error("Failed to get doctors");
  }
}

export async function createDoctor(input: createDoctorInput) {
  try {
    if (!input.name || !input.email) {
      throw new Error("name and email are required");
    }
    const doctor = await prisma.doctor.create({
      data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });
    revalidatePath("/admin");
    return doctor;
  } catch (error: any) {
    console.log("error creating doctor", error);

    if (error?.code === "P2002") {
      throw new Error("Doctor with this email already exists");
    }
    throw new Error("Failed to create doctor");
  }
}

export async function updateDoctor(input: updateDoctorInput) {
  try {
    if (!input.name || !input.email) {
      throw new Error("name and email are required");
    }

    const currentDoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
      select: {
        email: true,
      },
    });
    if (!currentDoctor) throw new Error("Doctor not found");

    if (input.email !== currentDoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email },
      });

      if (existingDoctor)
        throw new Error("Doctor with this email already exists");
    }

    const doctor = await prisma.doctor.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        phone: input.phone,
        speciality: input.speciality,
        gender: input.gender,
        isActive: input.isActive,
      },
    });
    return doctor;
  } catch (error) {
    console.log("error updating doctor", error);
    throw new Error("Failed to update doctor");
  }
}

export async function getAvailableDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        isActive: true,
      },
      include:{
        _count:{
          select:{
            appoitments:true,
          }, 
        },
      },
      orderBy:{
        name:"asc",
      },
    });
    return doctors.map((doctor) => ({
      ...doctor,
      appoitmentsCount: doctor._count.appoitments,
    }));
  }
  catch (error) {
    console.log("error getting available doctors", error);
    throw new Error("Failed to get available doctors");
  }
}