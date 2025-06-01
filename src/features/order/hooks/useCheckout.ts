import { useState, useEffect } from "react";
import { orderServices } from "../service/order.service";
import type { CheckoutResponse } from "../types/orders.type";

export const useCheckout = () => {
  const pathSegments = window.location.pathname.split("/");
  const [checkoutResponse, setCheckoutResponse] =
    useState<CheckoutResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const fetchCheckoutData = async () => {
    try {
      const response = await orderServices.checkout(
        pathSegments[pathSegments.length - 1]
      );
      setCheckoutResponse(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStatus(error.status);
      setErrorMessage("Có lỗi xảy ra khi tải dữ liệu, vui lòng thử lại");
    }
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  return { ...checkoutResponse?.checkout, errorMessage, status };
};
