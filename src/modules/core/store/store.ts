import { create } from "zustand";
import type { UserResource } from "@clerk/types";

interface State {
  user: UserResource | null;
  isLoaded: boolean;
  isAdmin: boolean;
  setUser: (user: UserResource) => void;
  setIsLoaded: (isLoaded: boolean) => void;
}

export const useUserStore = create<State>((set) => ({
  user: null,
  isLoaded: false,
  isAdmin: false,
  setUser: (user) =>
    set({
      user,
      isAdmin: user?.publicMetadata?.role === "admin",
    }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}));
