import type { ServiceDetailResponse } from "../types/service-detail.ts";
import { axiosInstance } from "@/config/axios";

const SERVICE_DETAIL_ENDPOINTS = {
  GET_SERVICE_BY_ID: "/service/",
};

export const serviceDetailApi = {
  getServiceById: async (serviceId: string): Promise<ServiceDetailResponse> => {
    try {
      const response = await axiosInstance.get(
        `${SERVICE_DETAIL_ENDPOINTS.GET_SERVICE_BY_ID}${serviceId}`
      );
      return {
        service: response.data.data.service,
        totalReviews: response.data.data.totalReviews,
        averageRating: response.data.data.averageRating,
        status: response.status,
      };
    } catch (error) {
      console.error("Get service by id error");
      throw error;
    }
  },
};
