import { useState } from "react";
import { zalopayApi } from "../api/zalopay-api";

interface UseZaloPayCheckoutReturn {
  isLoading: boolean;
  error: string | null;
  initiatePayment: (planType: "MONTHLY" | "YEARLY") => Promise<void>;
}

/**
 * Hook to handle ZaloPay checkout process
 */
export const useZaloPayCheckout = (): UseZaloPayCheckoutReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = async (planType: "MONTHLY" | "YEARLY") => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await zalopayApi.createPayment(planType);

      // Redirect to ZaloPay payment page
      if (response.order_url) {
        window.location.href = response.order_url;
      } else {
        setError("Không thể tạo liên kết thanh toán");
      }
    } catch (error) {
      console.error("Error initiating ZaloPay payment:", error);
      setError("Đã xảy ra lỗi khi kết nối tới ZaloPay");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    initiatePayment,
  };
};
