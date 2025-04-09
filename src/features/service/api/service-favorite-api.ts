import { axiosInstance } from "@/config/axios";
import type {
  CreateServiceFavoriteResponse,
  DeleteServiceFavoriteResponse,
  ServiceFavoriteResponse,
  ServiceFavoriteRequest,
} from "../types/service-favorite.type";

const SERVICE_FAVORITE_ENDPOINTS = {
  GET_FAVORITES: "/favorites",
  ADD_FAVORITE: "/favorites",
  DELETE_FAVORITE: "/favorites",
};

const serviceFavoriteApi = {
  addServiceFavorite: async (
    request: ServiceFavoriteRequest
  ): Promise<CreateServiceFavoriteResponse> => {
    try {
      const response = await axiosInstance.post(
        SERVICE_FAVORITE_ENDPOINTS.ADD_FAVORITE,
        request
      );
      return {
        ...response.data,
      };
    } catch (error) {
      console.error("Failed to add service favorite");
      throw error;
    }
  },

  deleteServiceFavorite: async (
    favoriteId: string
  ): Promise<DeleteServiceFavoriteResponse> => {
    try {
      const response = await axiosInstance.delete(
        `${SERVICE_FAVORITE_ENDPOINTS.DELETE_FAVORITE}/${favoriteId}`
      );
      return {
        ...response.data,
      };
    } catch (error) {
      console.error("Failed to delete service favorite");
      throw error;
    }
  },

  getServiceFavorites: async (): Promise<ServiceFavoriteResponse> => {
    try {
      const response = await axiosInstance.get(
        SERVICE_FAVORITE_ENDPOINTS.GET_FAVORITES
      );
      return {
        favorites: response.data.favorites,
      };
    } catch (error) {
      console.error("Failed to get service favorites");
      throw error;
    }
  },
};

export default serviceFavoriteApi;
