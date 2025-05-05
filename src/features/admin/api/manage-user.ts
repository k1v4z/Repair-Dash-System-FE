import { axiosInstance } from "@/config/axios";
import type { ManageUserResponse } from "../types/manage-user.type";
import type { AddUserInput } from "../types/manage-user.type";
import { AxiosError } from "axios";
import { AddUserResponse } from "../types/manage-user.type";
import { DeleteUserResponse } from "../types/manage-user.type";

const USER_ENDPOINTS = {
  GET_ALL_USERS: "/reports/users",
  LOCK_USER: "/users/:id/lock",
  ADD_USER: "/users",
  DELETE_USER: "/users",
};

const manageUserApi = {
  getAllUsers: async (
    index: number,
    max_range: number,
    identifier_email?: string,
    user_full_name?: string
  ): Promise<ManageUserResponse> => {
    try {
      // Construct query parameters
      const params: Record<string, string | number> = { index, max_range };
      if (identifier_email) params.identifier_email = identifier_email;
      if (user_full_name) params.user_full_name = user_full_name;

      const response = await axiosInstance.get(USER_ENDPOINTS.GET_ALL_USERS, {
        params,
      });
      return {
        total_users: response.data.total_users,
        total_store_users: response.data.total_store_users,
        total_customer_users: response.data.total_customer_users,
        total_admin_users: response.data.total_admin_users,
        users: response.data.users,
        total_page: response.data.total_pages,
        current_page: response.data.current_page,
      };
    } catch (error) {
      console.error("Error fetching reports");
      throw error;
    }
  },
  lockUser: async (id: number): Promise<void> => {
    try {
      await axiosInstance.put(
        USER_ENDPOINTS.LOCK_USER.replace(":id", id.toString())
      );
    } catch (error) {
      console.error("Error locking user");
      throw error;
    }
  },
  addUser: async (data: AddUserInput): Promise<AddUserResponse> => {
    try {
      const response = await axiosInstance.post(USER_ENDPOINTS.ADD_USER, data);
      return {
        user_id: response.data.user_id,
        status: response.status,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data.code === -1) {
          throw new Error("Email đã tồn tại");
        } else {
          throw new Error("Thêm người dùng thất bại. Vui lòng thử lại.");
        }
      }
      throw error;
    }
  },
  deleteUser: async (userId: string): Promise<DeleteUserResponse> => {
    try {
      const response = await axiosInstance.delete(
        `${USER_ENDPOINTS.DELETE_USER}/${userId}`
      );
      return {
        status: response.status,
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data.code === -1) {
          throw new Error("Không tìm thấy người dùng.");
        } else {
          throw new Error("Xoá người dùng thất bại. Vui lòng thử lại.");
        }
      }
      throw error;
    }
  },
};

export default manageUserApi;
