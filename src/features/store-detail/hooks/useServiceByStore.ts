import { useState, useEffect } from "react";
import type { Service } from "@/types/service";
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
      } else {
        setError("Failed to fetch services.");
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesByStore();
  }, [storeId]);

  return { loading, serviceList, error };
};

export default useServiceByStore;
