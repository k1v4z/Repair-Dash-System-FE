import Cookies from "js-cookie";
import {
  LoginResponse,
  AuthStatus,
  RegisterInput,
} from "../types/auth-store.type";
import { authApi } from "../api";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await authApi.login(email, password);
    return response;
  },

  async logout(): Promise<void> {
    try {
      await authApi.logout();
    } finally {
      // Always remove the cookie even if the API call fails
      Cookies.remove(ACCESS_TOKEN_KEY);
      Cookies.remove(REFRESH_TOKEN_KEY);
    }
  },

  async checkAuthStatus(): Promise<AuthStatus> {
    const response = await authApi.checkAuthStatus();
    return {
      auth_status: response.auth_status,
      user_id: response.user_id,
    };
  },

  async register(data: RegisterInput): Promise<LoginResponse> {
    const response = await authApi.register(data);
    return response;
  },

  async refreshToken(): Promise<LoginResponse> {
    const response = await authApi.refreshToken();
    if (response.status === 200) {
      // The server will automatically set new cookies
      console.log("Token refreshed successfully");
    }
    return response;
  },
};
