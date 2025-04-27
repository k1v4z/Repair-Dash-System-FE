import { userApi } from "../api/user.api";
import type { UserResponse } from "../types/user.types";

export const userService = {
  /**
   * Get user information from the API
   * @returns Promise with user data
   */
  getUserInfo: async (id: number): Promise<UserResponse> => {
    return await userApi.getUserById(id);
  },
};
