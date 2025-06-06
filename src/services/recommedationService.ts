import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import type { Recommendation } from "@/types/recommendation.types";
import { CreateRecommendationForm } from "@/types/forms.types";

export const fetchGetRecommendations = async (): Promise<Recommendation[]> => {
  const response = await axios.get(API_ENDPOINTS.recommendations.list);
  return response.data;
};

export const fetchCreateRecommendation = async (
  recommendation: CreateRecommendationForm
): Promise<Recommendation> => {
  const response = await axios.post(
    API_ENDPOINTS.recommendations.create,
    recommendation
  );
  return response.data;
};

export const fetchUpdateRecommendation = async (
  recommendation: CreateRecommendationForm
): Promise<Recommendation> => {
  const response = await axios.put(
    API_ENDPOINTS.recommendations.update,
    recommendation
  );
  return response.data;
};

export const fetchDelRecommendations = async (id: number): Promise<any> => {
  const response = await axios.delete(API_ENDPOINTS.recommendations.delete(id));
  return response.data;
};
