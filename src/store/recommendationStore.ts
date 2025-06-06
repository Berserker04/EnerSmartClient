import { fetchGetRecommendations } from "@/services/recommedationService";
import { Recommendation } from "@/types/recommendation.types";
import { create } from "zustand";

interface RecommendationState {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
  fetchRecommendations: () => Promise<void>;
}

export const useRecommendationStore = create<RecommendationState>((set) => ({
  recommendations: [],
  loading: false,
  error: null,

  fetchRecommendations: async () => {
    set({ loading: true, error: null });
    try {
      const recommendations = await fetchGetRecommendations();
      set({ recommendations, loading: false });
    } catch (error) {
      set({ error: "Error al cargar las recomendaciones", loading: false });
    }
  },
}));
