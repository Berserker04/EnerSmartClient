import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import type { BaseResponse, BaseEntity } from "@/types";

export const fetchGetRoles = async (): Promise<BaseResponse<BaseEntity[]>> => {
  const response = await axios.get(API_ENDPOINTS.role.list);
  return response.data;
};
