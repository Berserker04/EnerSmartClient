import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  setIsLoginModalOpen: (state: boolean) => void;
  setIsRegisterModalOpen: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      setIsLoginModalOpen: (state) => {
        return set({ isLoginModalOpen: state });
      },
      setIsRegisterModalOpen: (state) => {
        return set({ isRegisterModalOpen: state });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
