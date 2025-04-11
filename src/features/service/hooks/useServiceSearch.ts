import { useState } from "react";
import type {
  SearchServiceParams,
  SearchServiceResponse,
  SearchServiceItem,
} from "../types/search.type";
import { searchService } from "../service/search-service";

interface UseServiceSearchReturn {
  isLoading: boolean;
  error: Error | null;
  searchResults: SearchServiceItem[];
  totalPages: number;
  currentPage: number;
  searchServices: (params: SearchServiceParams) => Promise<void>;
  searchParamsToUrl: (params: SearchServiceParams) => URLSearchParams;
  buildSearchParamsFromUrl: (urlParams: URLSearchParams) => SearchServiceParams;
  hasSearched: boolean;
  searchParams: SearchServiceParams;
}

export const useServiceSearch = (): UseServiceSearchReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchResults, setSearchResults] = useState<SearchServiceItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<SearchServiceParams>({});

  const searchServices = async (params: SearchServiceParams): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    setSearchParams(params);

    try {
      const response: SearchServiceResponse =
        await searchService.searchServices(params);
      setSearchResults(response.services);
      setTotalPages(response.total_pages);
      setCurrentPage(response.current_page);
    } catch (err) {
      setError(err as Error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchParamsToUrl = (params: SearchServiceParams): URLSearchParams => {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        urlParams.set(
          key === "user_city"
            ? "city"
            : key === "user_district"
            ? "district"
            : key === "user_ward"
            ? "ward"
            : key === "user_street"
            ? "street"
            : key,
          String(value)
        );
      }
    });

    return urlParams;
  };

  const buildSearchParamsFromUrl = (
    urlParams: URLSearchParams
  ): SearchServiceParams => {
    const params: SearchServiceParams = {};

    if (urlParams.has("keyword"))
      params.keyword = urlParams.get("keyword") || undefined;
    if (urlParams.has("city"))
      params.user_city = urlParams.get("city") || undefined;
    if (urlParams.has("district"))
      params.user_district = urlParams.get("district") || undefined;
    if (urlParams.has("ward"))
      params.user_ward = urlParams.get("ward") || undefined;
    if (urlParams.has("street"))
      params.user_street = urlParams.get("street") || undefined;
    if (urlParams.has("index"))
      params.index = Number(urlParams.get("index")) || 1;
    if (urlParams.has("max_range"))
      params.max_range = Number(urlParams.get("max_range")) || undefined;

    return params;
  };

  return {
    isLoading,
    error,
    searchResults,
    totalPages,
    currentPage,
    searchServices,
    searchParamsToUrl,
    buildSearchParamsFromUrl,
    hasSearched,
    searchParams,
  };
};
