import { axiosInstance } from "@/config/axios";
import type {
  SearchServiceParams,
  SearchServiceResponse,
} from "../types/search.type";

const SEARCH_SERVICE_ENDPOINTS = {
  SEARCH: "/search/services",
};

export const searchServiceApi = {
  searchServices: async (
    params: SearchServiceParams
  ): Promise<SearchServiceResponse> => {
    try {
      const response = await axiosInstance.get(
        SEARCH_SERVICE_ENDPOINTS.SEARCH,
        {
          params,
        }
      );

      return {
        total_pages: response.data.total_pages,
        current_page: response.data.current_page,
        services: response.data.services || [],
      };
    } catch (error) {
      console.error("Search services error");
      throw error;
    }
  },
};
