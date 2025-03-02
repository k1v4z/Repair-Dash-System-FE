import { axiosInstance } from "@/config/axios";
import { LoginResponse } from "../types/auth-store.type";

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  REFRESH: "/auth/refresh",
};

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, {
        identifier_email: email,
        password,
      });

      return { status: response.status };
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error("Logout API error:", error);
      throw error;
    }
  },

  refreshToken: async (): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH);
      return response.data;
    } catch (error) {
      console.error("Token refresh error:", error);
      throw error;
    }
  },
};
