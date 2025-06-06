import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import type { Recommendation } from "@/types/recommendation.types";
import { CreateDiagnosticForm, Diagnostic } from "@/types/diagnostic";

export const fetchGetRecommendations = async (): Promise<Recommendation[]> => {
  const response = await axios.get(API_ENDPOINTS.recommendations.list);
  return response.data;
};

export const fetchCreateDiagnostic = async (
  id: string,
  diagnostic: CreateDiagnosticForm
): Promise<Diagnostic> => {
  const response = await axios.post(
    API_ENDPOINTS.diagnostics.calculate(id),
    diagnostic
  );
  return response.data;
};
