"use client";

import { getAppoitments } from "@/lib/action/appoitments";
import { useQuery } from "@tanstack/react-query";

export function useGetAppoitments() {
  try {
    const result = useQuery({
      queryKey: ["getAppoitments"],
      queryFn: getAppoitments,
    });
    return result;
  } catch (error) {
    console.log("error getting appoitments", error);
    throw new Error("Failed to get appoitments");
  }
}
