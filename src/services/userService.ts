import { API_ENDPOINTS } from "@/config/api";
import { BaseResponse } from "@/types";
import type { UserData } from "@/types/user.types";
import axios from "axios";

export const fetchGetSellers = async (
  roleName: string,
  token: string = ""
): Promise<BaseResponse<UserData[]>> => {
  const response = await axios.get(API_ENDPOINTS.user.list + `/${roleName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchUserById = async (id: string): Promise<UserData> => {
  const response = await axios.get(API_ENDPOINTS.user.me(id));
  return response.data;
};
