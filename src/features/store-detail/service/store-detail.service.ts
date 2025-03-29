import { storeDetailApi } from "../api";
import type {
  ServiceResponse,
  StoreDetailResponse,
} from "../types/store-detail.type";

export const storeDetailServices = {
  getServicesByStore: async (storeId: string): Promise<ServiceResponse> => {
    const response = await storeDetailApi.getServicesByStore(storeId);
    return response;
  },

  getStoreDetail: async (storeId: string): Promise<StoreDetailResponse> => {
    const response = await storeDetailApi.getStoreDetail(storeId);
    return response;
  },
};
