import serviceFavoriteApi from "../api/service-favorite-api";
import type {
  CreateServiceFavoriteResponse,
  DeleteServiceFavoriteResponse,
  ServiceFavoriteResponse,
  ServiceFavoriteRequest,
} from "../types/service-favorite.type";

const serviceFavoriteServices = {
  addServiceFavorite: async (
    request: ServiceFavoriteRequest
  ): Promise<CreateServiceFavoriteResponse> => {
    const response = await serviceFavoriteApi.addServiceFavorite(request);
    return response;
  },

  deleteServiceFavorite: async (
    favoriteId: string
  ): Promise<DeleteServiceFavoriteResponse> => {
    const response = await serviceFavoriteApi.deleteServiceFavorite(favoriteId);
    return response;
  },

  getServiceFavorite: async (): Promise<ServiceFavoriteResponse> => {
    const response = await serviceFavoriteApi.getServiceFavorites();
    return response;
  },
};

export default serviceFavoriteServices;
