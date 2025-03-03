import { axiosInstance } from "@/config/axios";
import {
  LoginResponse,
  RegisterInput,
  AuthStatus,
} from "../types/auth-store.type";

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  STATUS: "/auth/status",
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
      (error as Error).message = "Failed to login";
      console.error("Error: ", (error as Error).message);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      (error as Error).message = "Failed to logout";
      console.error("Error: ", error);
      throw error;
    }
  },

  checkAuthStatus: async (): Promise<AuthStatus> => {
    try {
      const response = await axiosInstance.get(AUTH_ENDPOINTS.STATUS);
      return response.data;
    } catch (error) {
      console.error("Check auth status error:", error);
      throw error;
    }
  },

  refreshToken: async (): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.REFRESH);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        error.message = "Failed to refresh token";
      }
      throw error;
    }
  },

  register: async (data: RegisterInput): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, data);
      return { status: response.status };
    } catch (error) {
      if (error instanceof Error) {
        error.message = "Failed to register";
      }
      throw error;
    }
  },
};
