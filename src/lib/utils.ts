import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateAvatar = (name: string, gender: "MALE" | "FEMALE") => {
  const username = name.replace(/\s+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if (gender === "FEMALE") return `${base}/girl?username=${username}`;
  return `${base}/boy?username=${username}`;
};

// export const formatPhoneNumber = (value: string) => {
//   if (!value) return value;
//   const phoneNumber = value.replace(/[^\d]/g, "");
//   const phoneNumberLength = phoneNumber.length;
//   if (phoneNumberLength < 4) return phoneNumber;
//   if (phoneNumberLength < 7)
//     return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
//   return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
//     3,
//     6
//   )}-${phoneNumber.slice(6, 10)}`;
// };

export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  // Remove all non-digits
  const phone = value.replace(/[^\d]/g, "");

  // If less than 5 digits → simply return
  if (phone.length <= 5) return phone;

  // If between 6 and 10 digits → format as XXXXX XXXXX
  if (phone.length <= 10) {
    return `${phone.slice(0, 5)} ${phone.slice(5)}`;
  }

  // If full with country code (up to 12 digits)
  if (phone.length <= 12) {
    return `+${phone.slice(0, 2)} ${phone.slice(2, 7)} ${phone.slice(7, 12)}`;
  }

  // For extra-long numbers, still try to format first 12 digits
  return `+${phone.slice(0, 2)} ${phone.slice(2, 7)} ${phone.slice(7, 12)}`;
};
