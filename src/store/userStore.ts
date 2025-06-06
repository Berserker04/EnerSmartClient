import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JWTAccessToken } from "@/types";
import type { UserData } from "@/types/user.types";

interface UserState {
  user: UserData | null;
  userToken: JWTAccessToken | null;
  logout: () => void;
  setUser: (user: UserData) => void;
  setUserToken: (token: JWTAccessToken) => void;
  getUser: () => UserData | null;
  getUserToken: () => JWTAccessToken | null;
  hydrateUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      userToken: null,
      logout: () => {
        localStorage.clear();
        set({ user: null });
        set({ userToken: null });
      },
      setUser: (user) => {
        localStorage.setItem("x-user-data", JSON.stringify(user));
        return set({ user });
      },
      setUserToken: (token) => {
        localStorage.setItem("x-user-token", JSON.stringify(token));
        return set({ userToken: token });
      },
      getUser: () => get().user,
      getUserToken: () => get().userToken,
      hydrateUser: () => {
        const userDataStr = localStorage.getItem("x-user-data");

        if (userDataStr) {
          set({
            user: JSON.parse(userDataStr)
          });
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
