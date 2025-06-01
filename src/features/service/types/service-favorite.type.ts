import type { Service } from "@/features/store/types/store-detail.type";
import type { UserAddress } from "@/types/service";

export type CreateServiceFavoriteResponse = {
  favorite_id: number;
};

export type DeleteServiceFavoriteResponse = {
  message: string;
};

export type ServiceFavoriteRequest =
  | { service_id: number; store_id?: never }
  | { service_id?: never; store_id: number };

export type ServiceFavorite = {
  favorite_id: number;
  is_store: boolean;
  store: UserAddress;
  service: Service;
};

export type ServiceFavoriteResponse = {
  favorites: ServiceFavorite[];
};
