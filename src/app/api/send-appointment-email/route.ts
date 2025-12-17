import AppontmentConfirmationEmail from "@/components/emails/AppontmentConfirmationEmail";
import { resend } from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
    } = body;
    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime || !appointmentType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const { data, error } = await resend.emails.send({
      from: "Dentwise <prasad@resend.dev>",
      to: [userEmail],
      subject: "Your Appointment Confirmaation - Dentwise",
      react: AppontmentConfirmationEmail({
        doctorName,
        appointmentDate,
        appointmentTime,
        appointmentType,
        duration,
        price,
      }),
    });
    if (error) {
      console.error("Error sending appointment email", error);
      return NextResponse.json(
        { error: "Failed to send appointment email" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Email sent successfully", emailId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending appointment email", error);
    return NextResponse.json(
      { error: "Failed to send appointment email" },
      { status: 500 }
    );
  }
}
