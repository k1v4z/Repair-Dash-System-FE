import { useState, useEffect } from "react";
import type { StoreDetailResponse } from "../types/store-detail.type";
import { storeDetailServices } from "@/features/store-detail/service/store-detail.service";

const useStoreDetail = (storeId: string) => {
  const [storeDetail, setStoreDetail] = useState<StoreDetailResponse | null>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  const fetchStoreDetail = async () => {
    try {
      setLoading(true);
      const response = await storeDetailServices.getStoreDetail(storeId);
      if (response.status === 200) {
        setStoreDetail(response);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage("Failed to fetch store detail.");
      setStatus(error.status);
      setErrorMessage("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchStoreDetail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  return {
    storeDetail,
    loading,
    errorMessage,
    status,
  };
};

export default useStoreDetail;
