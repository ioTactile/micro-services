import { create } from "zustand";
import type { UserResource } from "@clerk/types";

interface State {
  user: UserResource | null;
  isAdmin: boolean;
  setUser: (user: UserResource) => void;
}

export const useUserStore = create<State>((set) => ({
  user: null,
  isAdmin: false,
  setUser: (user) =>
    set({
      user,
      isAdmin: user?.publicMetadata?.role === "admin",
    }),
}));
