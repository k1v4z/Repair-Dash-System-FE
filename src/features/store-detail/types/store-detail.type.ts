import type { Service } from "@/types/service";

export type Review = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  rating: number;
};
export type ServiceResponse = {
  services: Service[];
  status: number;
};
