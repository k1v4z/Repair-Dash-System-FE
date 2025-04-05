import { useState, useEffect } from "react";
import type { ServiceDetailResponse } from "../types/service-detail";
import { serviceDetailServices } from "../service/service-detail";

const useServiceDetail = (serviceId: string) => {
  const [serviceDetail, setServiceDetail] =
    useState<ServiceDetailResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  const fetchServiceById = async () => {
    try {
      setLoading(true);
      const response = await serviceDetailServices.getServiceById(serviceId);
      if (response.status === 200) {
        setServiceDetail(response);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStatus(error.status);
      setErrorMessage("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchServiceById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  return { serviceDetail, loading, errorMessage, status };
};

export default useServiceDetail;
