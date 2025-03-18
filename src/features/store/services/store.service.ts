import { storeApi } from "../api";
import type { UpdateServiceRequest, AddServiceRequest } from "../types/store.type";
export const storeService = {
  getServicesByOwner: async (ownerId: string) => {
    return await storeApi.getServicesByOwner(ownerId);
  },
  deleteService: async (serviceId: string) => {
    return await storeApi.deleteService(serviceId);
  },
  updateService: async (serviceId: string, data: UpdateServiceRequest) => {
    return await storeApi.updateService(serviceId, data);
  },
  addService: async (data: AddServiceRequest) => {
    return await storeApi.addService(data);
  },
};

