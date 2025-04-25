import { axiosInstance } from "@/config/axios";
import type {
  ZaloPayResponse,
  ZaloPayVerifyResponse,
} from "@/features/subscriptions/types/zalo-pay";

const PAYMENT_ENDPOINTS = "/payment/zalopay";

export const zalopayApi = {
  createPayment: async (
    type: "MONTHLY" | "YEARLY"
  ): Promise<ZaloPayResponse> => {
    try {
      const response = await axiosInstance.post(
        `${PAYMENT_ENDPOINTS}?type=${type}`
      );
      return response.data;
    } catch (error) {
      console.error("Error creating ZaloPay payment:");
      throw error;
    }
  },

  verifyPayment: async (apptransid: string): Promise<ZaloPayVerifyResponse> => {
    try {
      const response = await axiosInstance.put(
        `${PAYMENT_ENDPOINTS}/${apptransid}`
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying ZaloPay payment:");
      throw error;
    }
  },
};
