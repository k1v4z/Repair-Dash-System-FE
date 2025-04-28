import { axiosInstance } from "@/config/axios";
import type { UserResponse } from "../types/user.types";

const USER_ENDPOINTS = {
  GET_BY_ID: "/users",
};

export const userApi = {
  getUserById: async (id: number): Promise<UserResponse> => {
    try {
      const response = await axiosInstance.get<UserResponse>(
        `${USER_ENDPOINTS.GET_BY_ID}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user info:");
      throw error;
    }
  },
};
