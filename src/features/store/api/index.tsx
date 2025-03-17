import { axiosInstance } from "@/config/axios";

const STORE_ENDPOINTS = {
  GET_SERVICES_BY_OWNER: "/service/store/:ownerId",
  DELETE_SERVICE: "/service/:serviceId",
};

export const storeApi = {
  getServicesByOwner: async (ownerId: string) => {
    try {
      const response = await axiosInstance.get(
        STORE_ENDPOINTS.GET_SERVICES_BY_OWNER.replace(":ownerId", ownerId)
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  },
  deleteService: async (serviceId: string) => {
    try {
      const response = await axiosInstance.delete(
        STORE_ENDPOINTS.DELETE_SERVICE.replace(":serviceId", serviceId)
      );
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  },
};
