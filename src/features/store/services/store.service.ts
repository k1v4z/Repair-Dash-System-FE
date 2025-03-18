import { storeApi } from "../api";
import type { UpdateServiceRequest, AddServiceRequest, ServiceResponse } from "../types/store.type";

export const storeService = {
  getServicesByOwner: async (params: { page: number; limit: number }): Promise<ServiceResponse> => {
    try {
      const { page, limit } = params;
      const response = await storeApi.getServicesByOwner(page, limit);
      return response;
    } catch (error) {
      console.error("Error in getServicesByOwner:", error);
      throw error;
    }
  },

  deleteService: async (serviceId: string) => {
    return await storeApi.deleteService(serviceId);
  },
  updateService: async (serviceId: string, data: UpdateServiceRequest) => {
    try {
      const response = await storeApi.updateService(serviceId, data);
      return response;
    } catch (error) {
      console.error("Error in updateService:", error);
      throw error;
    }
  },
  addService: async (data: AddServiceRequest) => {
    return await storeApi.addService(data);
  },
};

