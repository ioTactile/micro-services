import { useUserStore } from "@/modules/core/store/store";
import { useCallback } from "react";
import { redirect } from "next/navigation";

export const useAuthAction = () => {
  const { user, isLoaded } = useUserStore();

  const handleAuthAction = useCallback(
    (action: () => void) => {
      if (!isLoaded) return;

      if (!user) {
        redirect("/auth/sign-in");
      }

      action();
    },
    [user, isLoaded]
  );

  return { handleAuthAction };
};
