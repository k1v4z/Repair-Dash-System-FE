import type { ServiceResponse } from "../types/store-detail.type";
import type { StoreDetailResponse } from "../types/store-detail.type";
import { axiosInstance } from "@/config/axios";

const STORE_ENDPOINTS = {
  GET_SERVICES_BY_STORE: "/services/stores",
  GET_STORE_DETAIL: "/users",
};

export const storeDetailApi = {
  getServicesByStore: async (storeId: string): Promise<ServiceResponse> => {
    try {
      const response = await axiosInstance.get(
        `${STORE_ENDPOINTS.GET_SERVICES_BY_STORE}/${storeId}`
      );

      return {
        services: response.data.services,
        status: response.status,
      };
    } catch (error) {
      console.error("Get services by store error");
      throw error;
    }
  },

  getStoreDetail: async (storeId: string): Promise<StoreDetailResponse> => {
    try {
      const response = await axiosInstance.get(
        `${STORE_ENDPOINTS.GET_STORE_DETAIL}/${storeId}`
      );
      return {
        store: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Get store detail error");
      throw error;
    }
  },
};
