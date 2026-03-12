import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { IUser } from "@/types/auth";

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (token: string, user: IUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (token, user) => {
        Cookies.set("jwt", token, { expires: 7 });
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        Cookies.remove("jwt");
        set({ user: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          window.location.assign("/login");
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
