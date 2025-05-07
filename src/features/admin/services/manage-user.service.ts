import manageUserApi from "../api/manage-user";
import type {
  ManageUserResponse,
  UpdateUserInput,
  UpdateUserResponse,
} from "../types/manage-user.type";
import { AddUserInput } from "../types/manage-user.type";
import { AddUserResponse } from "../types/manage-user.type";
import { DeleteUserResponse } from "../types/manage-user.type";

const manageUserServices = {
  getAllUsers: async (
    index: number,
    max_range: number,
    identifier_email?: string,
    user_full_name?: string
  ): Promise<ManageUserResponse> => {
    const response = await manageUserApi.getAllUsers(
      index,
      max_range,
      identifier_email,
      user_full_name
    );
    return response;
  },
  lockUser: async (id: number): Promise<void> => {
    await manageUserApi.lockUser(id);
  },
  addUser: async (data: AddUserInput): Promise<AddUserResponse> => {
    const response = await manageUserApi.addUser(data);
    return response;
  },
  deleteUser: async (userId: string): Promise<DeleteUserResponse> => {
    const response = await manageUserApi.deleteUser(userId);
    return response;
  },
  updateUser: async (
    data: UpdateUserInput,
    userId: number
  ): Promise<UpdateUserResponse> => {
    const convertedData = { ...data };
    Object.keys(data).forEach((key) => {
      if (key === "password" && !data.password.length) {
        delete convertedData[key as keyof UpdateUserInput];
      }
    });
    const response = await manageUserApi.updateUser(convertedData, userId);
    return response;
  },
};

export default manageUserServices;
