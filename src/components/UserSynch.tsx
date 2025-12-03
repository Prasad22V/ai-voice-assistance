"use client";

import { syncUser } from "@/lib/action/user";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

function UserSynch() {
  const { isSignedIn, isLoaded } = useUser();
  useEffect(() => {
    const handleUserSync = async () => {
      if (isSignedIn && isLoaded) {
        try {
          await syncUser();
        } catch (error) {
          console.error("Failed to syncing user", error);
        }
      }
    };
    handleUserSync();
  }, [isSignedIn, isLoaded]);
  return null;
}

export default UserSynch;
