import type { Service } from "@/features/store-detail/types/store-detail.type";
import type { Review } from "@/features/store-detail/types/store-detail.type";

export interface ServiceDetail extends Service {
  orders: Review[];
}

export type ServiceDetailResponse = {
  service: ServiceDetail;
  totalReviews: number;
  averageRating: number;
  status: number;
};
