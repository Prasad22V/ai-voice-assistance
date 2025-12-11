"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "../prisma";

function transformAppointment(appointment: any) {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${
      appointment.user.lastName || ""
    }`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
  };
}

export async function getAppoitments() {
  try {
    const appoitments = await prisma.appoitment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return appoitments;
  } catch (error) {
    console.log("error getting appoitments", error);
    throw new Error("Failed to get appoitments");
  }
}

export async function getUserAppointments() {
  try {
    // get authenticated user from Clerk
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to view appointments");

    // find user by clerkId from authenticated session
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user)
      throw new Error(
        "User not found. Please ensure your account is properly set up."
      );

    const appointments = await prisma.appoitment.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.log("Error fetching user appointments:", error);
    throw new Error("Failed to fetch user appointments");
  }
}

export async function getUserAppoitmentStats() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    //
    const [totalCount, completedCount] = await Promise.all([
      prisma.appoitment.count({
        where: {
          userId: user.id,
        },
      }),
      prisma.appoitment.count({
        where: {
          userId: user.id,
          status: "COMPLETED",
        },
      }),
    ]);
    return {
      totalAppoitments: totalCount,
      completedAppoitments: completedCount,
    };
  } catch (error) {
    console.log("error getting user appoitments", error);
    return {
      totalAppoitments: 0,
      completedAppoitments: 0,
    };
  }
}
