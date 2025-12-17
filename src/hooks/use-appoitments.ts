"use client";

import {
  bookAppointment,
  getAppoitments,
  getBookedTimeSlots,
  getUserAppointments,
} from "@/lib/action/appoitments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useGetBookedTimeSlots(doctorId: string, date: string) {
  return useQuery({
    queryKey: ["getBookedTimeSlots"],
    queryFn: () => getBookedTimeSlots(doctorId!, date),
    enabled: !!doctorId && !!date, // only run query if doctorId and date are provided
  });
}

export function useBookAppointment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bookAppointment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getUserAppointments"] }),
    onError: (error: any) => console.log("error booking appointment", error),
  });
}


export function useUserAppointments() {
  return useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });
  
}