import { searchServiceApi } from "../api/search-service-api";
import type {
  SearchServiceParams,
  SearchServiceResponse,
} from "../types/search.type";

export const searchService = {
  /**
   * Search for services based on location and keyword
   * @param params Search parameters including location and keyword
   * @returns Promise with search results
   */
  searchServices: async (
    params: SearchServiceParams
  ): Promise<SearchServiceResponse> => {
    try {
      return await searchServiceApi.searchServices(params);
    } catch (error) {
      console.error("Service search error:");
      throw error;
    }
  },
};
