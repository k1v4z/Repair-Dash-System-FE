import { storeDetailApi } from "../api";
import type { ServiceResponse } from "../types/store-detail.type";

export const storeDetailServices = {
  getServicesByStore: async (storeId: string): Promise<ServiceResponse> => {
    const response = await storeDetailApi.getServicesByStore(storeId);
    return response;
  },
};
