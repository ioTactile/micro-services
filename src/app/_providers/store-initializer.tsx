"use client";

import { useUserStore } from "@/modules/core/store/store";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const StoreInitializer = () => {
  const { user } = useUser();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      console.log("user", user);
      setUser(user);
    }
  }, [user, setUser]);

  return null;
};

export default StoreInitializer;
