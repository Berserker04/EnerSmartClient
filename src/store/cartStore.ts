import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Recommendation } from "@/types/recommendation.types";

export interface CartState {
  recommendation: Recommendation | null;
  isAddProductModalOpen: boolean;
  setIsAddProductModalOpen: (state: boolean) => void;
  setRecommendation: (recommendation: Recommendation | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      recommendation: null,
      isAddProductModalOpen: false,
      setIsAddProductModalOpen: (state) => {
        return set({ isAddProductModalOpen: state, recommendation: state ? get().recommendation : null });
      },
      setRecommendation: (recommendation) => {
        return set({ recommendation });
      }
    }),
    {
      name: "cart-storage",
    }
  )
);
