import { useState, useEffect } from "react";
import type { Service } from "../types/store-detail.type";
import { storeDetailServices } from "@/features/store-detail/service/store-detail.service";

const useServiceByStore = (storeId: string) => {
  const [loading, setLoading] = useState(false);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fetchServicesByStore = async () => {
    try {
      setLoading(true);
      const response = await storeDetailServices.getServicesByStore(storeId);
      if (response.status === 200) {
        setServiceList(response.services);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to fetch services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesByStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  return { loading, serviceList, error };
};

export default useServiceByStore;
