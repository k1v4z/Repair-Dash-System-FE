import { storeApi } from "../api";
import type { UpdateServiceRequest, AddServiceRequest, ServiceResponse } from "../types/store.type";



export const storeService = {
  getServicesByOwner: async (ownerId: string, params: { page: number; limit: number }): Promise<ServiceResponse> => {
    return await storeApi.getServicesByOwner(ownerId, params);
  },
  deleteService: async (serviceId: string) => {
    return await storeApi.deleteService(serviceId);
  },
  updateService: async (serviceId: string, data: UpdateServiceRequest) => {
    try {
      console.log("Calling updateService API with:", { serviceId, data });
      const response = await storeApi.updateService(serviceId, data);
      console.log("API response:", response);
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

