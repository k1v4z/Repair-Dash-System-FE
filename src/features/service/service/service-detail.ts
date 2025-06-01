import { serviceDetailApi } from "../api/service-detail-api";
import type { ServiceDetailResponse } from "../types/service-detail.type";

export const serviceDetailServices = {
  getServiceById: async (serviceId: string): Promise<ServiceDetailResponse> => {
    const response = await serviceDetailApi.getServiceById(serviceId);
    return response;
  },
};
