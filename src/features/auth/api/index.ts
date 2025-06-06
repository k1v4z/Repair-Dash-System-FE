import { axiosInstance } from "@/config/axios";
import type {
  LoginResponse,
  RegisterInput,
  AuthStatus,
} from "../types/auth-store.type";
import { AxiosError } from "axios";

const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  STATUS: "/auth/status",
  REFRESH: "/auth/refresh",
  SEND_OTP: "/auth/send_link",
  VERIFY_OTP: "/auth/otp",
  RESET_PASSWORD: "/auth/reset_pass"
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data.code === -1) {
          throw new Error("Email đã tồn tại");
        } else {
          throw new Error("Đăng ký thất bại. Vui lòng thử lại.");
        }
      }
      throw error;
    }
  },
  
  sendOtp: async (email: string): Promise<{ message: string; code: number }> => {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.SEND_OTP, { email });
      return response.data;
    } catch (error) {
      console.error("Send OTP error:", error);
      throw error;
    }
  },

  verifyOtp: async (email: string, otp: string): Promise<{ message: string }> => {
    try {
      const response = await axiosInstance.post(`${AUTH_ENDPOINTS.VERIFY_OTP}?email=${email}`, { otp });
      return response.data;
    } catch (error) {
      console.error("Verify OTP error:", error);
      throw error;
    }
  },

  resetPassword: async (email: string, password: string): Promise<string> => {
    try {
      const response = await axiosInstance.post(`${AUTH_ENDPOINTS.RESET_PASSWORD}?email=${email}`, { 
        password,
        identifier_email: email
      });
      return response.data;
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  },
};
