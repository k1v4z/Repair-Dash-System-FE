import { storeApi } from "../api";

export const storeService = {
  getServicesByOwner: async (ownerId: string) => {
    return await storeApi.getServicesByOwner(ownerId);
  },
};
