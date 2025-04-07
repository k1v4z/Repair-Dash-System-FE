import { storeManageApi } from "../api/store-manage-api";
import type {
  UpdateServiceRequest,
  AddServiceRequest,
  ServiceResponse,
} from "../types/store-manage.type";
import { convertToBase64 } from "@/utils/convert/base64";
import { generateAlias } from "@/utils/alias";
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
      console.error("Error in getServicesByOwner:");
      throw error;
    }
  },

  deleteService: async (serviceId: string) => {
    return await storeManageApi.deleteService(serviceId);
  },
  updateService: async (serviceId: string, data: UpdateServiceRequest) => {
    try {
      const updatedData = { ...data };
      if (data.service_image instanceof File) { 
        const base64Image = await convertToBase64(data.service_image);
        updatedData.service_image = base64Image;
      }
      
      const response = await storeManageApi.updateService(serviceId, updatedData);     
      return response;
    } catch (error) {
      console.error("Error in updateService:");
      throw error;
    }
  },
  addService: async (data: AddServiceRequest) => {
    try {
      const addData = {
        service_name: data.service_name,
        service_description: data.service_description,
        service_image: data.service_image instanceof File ? await convertToBase64(data.service_image) : data.service_image,
        service_alias: data.service_alias || generateAlias(data.service_name),
      };
      const response = await storeManageApi.addService(addData);
      return response;
    } catch (error) {
      console.error("Error in addService:");
      throw error;
    }
  },
};
