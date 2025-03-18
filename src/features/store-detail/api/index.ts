import type { ServiceResponse } from "../types/store-detail.type";
import { axiosInstance } from "@/config/axios";

const STORE_ENDPOINTS = {
  GET_SERVICES_BY_STORE: "/service/store/",
};

export const storeDetailApi = {
  getServicesByStore: async (storeId: string): Promise<ServiceResponse> => {
    try {
      const response = await axiosInstance.get(
        `${STORE_ENDPOINTS.GET_SERVICES_BY_STORE}${storeId}`
      );

      return { services: response.data.data, status: response.status };
    } catch (error) {
      console.error("Get services by store error");
      throw error;
    }
  },
};
