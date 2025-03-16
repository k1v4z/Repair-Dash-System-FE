import type { Service, UserAddress } from "@/types/service";

export type CheckoutResponse = {
  checkout: {
    customer: UserAddress;
    service: Service;
  };
  status: number;
};
