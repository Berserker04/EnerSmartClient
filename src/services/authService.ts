import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";
import type { CreateUserForm, LoginForm } from "@/types/forms.types";
import type { UserData } from "@/types/user.types";

export const login = async (
  data: LoginForm
): Promise<any> => {
  const response = await axios.post(API_ENDPOINTS.auth.login, data);
  return response.data;
};

export const register = async (
  data: CreateUserForm
): Promise<UserData> => {
  const response = await axios.post(
    API_ENDPOINTS.user.register,
    parseCrearUserData(data)
  );
  return response.data;
};

export const parseCrearUserData = (data: CreateUserForm) => {
  return {
    fullName: data.fullName,
    userName: data.userName,
    password: data.password,
  };
};
