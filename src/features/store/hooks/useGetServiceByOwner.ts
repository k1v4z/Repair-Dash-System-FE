import { useState, useEffect } from "react";
import { storeService } from "../services/store.service";
import type { Service, UseGetServiceByOwnerReturn } from "../types/store.type";

export const useGetServiceByOwner = (
  pageSize : number): UseGetServiceByOwnerReturn => {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [shouldRefresh, setShouldRefresh] = useState(true);

  const loadServices = async (current_page: number, limit: number) => {
    try {
      setIsLoading(true);
      const response = await storeService.getServicesByOwner({
        page: current_page,
        limit,
      });
      setServices(response.listService);
      setTotalPages(response.totalPages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load services"));
      console.error("Failed to load services:", err);
    } finally {
      setIsLoading(false);
      setShouldRefresh(false);
    }
  };
  console.log("Service Page loaded:", currentPage);
  useEffect(() => {
    if (shouldRefresh) {
      loadServices(currentPage, pageSize);
      console.log("Refreshing services",services);
    }
  }, [shouldRefresh, currentPage]);

  const refreshServices = () => {
    setShouldRefresh(true);
  };

  return {
    services,
    setServices,
    currentPage,
    totalPages,
    isLoading,
    error,
    setCurrentPage,
    refreshServices,
  };
};
