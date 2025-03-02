import Cookies from "js-cookie";
import { LoginResponse } from "../types/auth-store.type";
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

  async refreshToken(): Promise<LoginResponse> {
    const response = await authApi.refreshToken();
    if (response.status === 200) {
      console.log("Token refreshed successfully");
    }
    return response;
  },

  isAuthenticated(): boolean {
    return !!Cookies.get(ACCESS_TOKEN_KEY);
  },

  getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_KEY);
  }
};
