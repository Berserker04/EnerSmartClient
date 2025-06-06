// const API_BASE_URL = "http://127.0.0.1:8000/api";
const API_BASE_URL = "https://enersmart.onrender.com/api";

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
  user: {
    me: (id: string) => `${API_BASE_URL}/users/${id}`,
    register: `${API_BASE_URL}/users`,
    list: `${API_BASE_URL}/users`,
  },
  recommendations: {
    list: `${API_BASE_URL}/recommendations`,
    create: `${API_BASE_URL}/recommendations`,
    update: `${API_BASE_URL}/recommendations`,
    delete: (id: number) => `${API_BASE_URL}/recommendations/${id}`,
  },
  diagnostics: {
    calculate: (id: string) => `${API_BASE_URL}/diagnostic/${id}`,
  },
  role: {
    list: `${API_BASE_URL}/roles`,
  },
};
