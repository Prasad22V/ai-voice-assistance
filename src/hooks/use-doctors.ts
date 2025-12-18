"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDoctor,
  getAvailableDoctors,
  getDoctor,
  updateDoctor,
} from "@/lib/action/doctor";

export function useGetDoctors() {
  const result = useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctor,
  });
  return result;
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: createDoctor,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getDoctors"] }),

    onError: (error: any) => console.log("error creating doctor", error),
  });
  return result;
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: updateDoctor,
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["getDoctors"] }),
        queryClient.invalidateQueries({ queryKey: ["getAvailableDoctors"] }));
    },
    onError: (error: any) => console.log("error updating doctor", error),
  });
  return result;
}

export function useAvailableDoctors() {
  return useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });
}
