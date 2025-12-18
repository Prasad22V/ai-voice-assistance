import UserSynch from "@/components/UserSynch";
import TanstackProvider from "@/components/providers/TanstackProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentWise AI Voice Assistance",
  description:
    "Get instant answers to your dental questions with DentWise AI Voice Assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackProvider>
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6C5CE7",
          colorBackground: "#f3f4f6",
          colorText: "#111827",
          colorTextSecondary: "#6b7280",
          colorInputBackground: "#f3f4f6",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <UserSynch />
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>
    </TanstackProvider>
  );
}
