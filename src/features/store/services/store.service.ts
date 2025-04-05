import { storeManageApi } from "../api/store-manage-api";
import type {
  UpdateServiceRequest,
  AddServiceRequest,
  ServiceResponse,
} from "../types/store-manage.type";

export const storeManageServices = {
  getServicesByOwner: async (params: {
    page: number;
    limit: number;
  }): Promise<ServiceResponse> => {
    try {
      const { page, limit } = params;
      const response = await storeManageApi.getServicesByOwner(page, limit);
      return response;
    } catch (error) {
      console.error("Error in getServicesByOwner:", error);
      throw error;
    }
  },

  deleteService: async (serviceId: string) => {
    return await storeManageApi.deleteService(serviceId);
  },
  updateService: async (serviceId: string, data: UpdateServiceRequest) => {
    try {
      const response = await storeManageApi.updateService(serviceId, data);
      return response;
    } catch (error) {
      console.error("Error in updateService:", error);
      throw error;
    }
  },
  addService: async (data: AddServiceRequest) => {
    return await storeManageApi.addService(data);
  },
};
