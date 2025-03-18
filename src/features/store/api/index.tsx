import { axiosInstance } from "@/config/axios";
import type { UpdateServiceRequest, AddServiceRequest } from "../types/store.type";

const STORE_ENDPOINTS = {
  GET_SERVICES_BY_OWNER: "/service/store/:ownerId",
  DELETE_SERVICE: "/service/:serviceId",
  UPDATE_SERVICE: "/service/:serviceId",
};

export const storeApi = {
  getServicesByOwner: async (ownerId: string, params: { page: number; limit: number }) => {
    try {
      const response = await axiosInstance.get(
        `/service/store/${ownerId}`,
        { 
          params: {
            limit: params.limit,
            index: params.page
          }
        }
      );
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
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
  updateService: async (serviceId: string, data: UpdateServiceRequest) => {
    try {
      console.log("Making API request to update service:", { serviceId, data });
      const response = await axiosInstance.put(
        STORE_ENDPOINTS.UPDATE_SERVICE.replace(":serviceId", serviceId),
        data
      );
      console.log("API response:", response);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  addService: async (data: AddServiceRequest) => {
    try {
      const response = await axiosInstance.post("/service", data);
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  },
};
