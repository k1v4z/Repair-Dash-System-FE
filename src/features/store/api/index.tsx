import { axiosInstance } from "@/config/axios";
import type { UpdateServiceRequest, AddServiceRequest, ServiceResponse} from "../types/store.type";

const STORE_ENDPOINTS = {
  GET_SERVICES_BY_OWNER: "/profile",
  DELETE_SERVICE: "/services/:serviceId",
  UPDATE_SERVICE: "/services/:serviceId",
  ADD_SERVICE: "/services"
};

export const storeApi = {
  getServicesByOwner: async (current_page: number, limit: number): Promise<ServiceResponse>=> {
    try {
      const response = await axiosInstance.get(STORE_ENDPOINTS.GET_SERVICES_BY_OWNER, {
        params: {
          current_page,
          limit
        }
       });

      return {      
          listService: response.data.profile.services || [],
          totalPages: response.data.total_pages,
          currentPage: response.data.current_page
      };
    } catch (error) {
      console.error("Error fetching services:", error);
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
      const response = await axiosInstance.post(STORE_ENDPOINTS.ADD_SERVICE, data);
      return response.data;
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  },
};
