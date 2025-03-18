export type FilterType = "location" | "price" | "rating";

export type FilterOption = {
  id: string;
  name: string;
  type: FilterType;
  value?: number;
};

export type FilterSelectProps = {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
};

export type Owner = {
  user_full_name: string;
  user_street: string;
  user_ward: string;
  user_district: string;
  user_city: string;
  user_phone_number: string;
};

export interface ServiceResponse {
  listService: Service[];
  totalPages: number;
  currentPage: number;
}

export interface Service {
  service_id: number;
  service_name: string;
  service_description: string;
  service_alias: string;
  service_image_url: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateServiceRequest {
  service_name: string;
  service_description: string;
  service_image?: string;
}

export type AddServiceRequest = {
  service_name: string;
  service_description: string;
  service_image: string | null;
  service_alias: string;
};

export type UpdateServiceResponse = {
  data: {
    message: string;
    serviceId: {
      message: string;
      newService: Service;
      listService: Service[];
      limit: number;
      index: number;
      totalPages: number;
    };
  };
};

export type AddServiceResponse = {
  data: {
    message: string;
    serviceId: {
      message: string;
      newService: Service;
      listService: Service[];
      limit: number;
      index: number;
      totalPages: number;
    };
  };
};

export type UseGetServiceByOwnerProps = {
  ownerId: string;
  pageSize?: number;
};

export type UseGetServiceByOwnerReturn = {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  setCurrentPage: (page: number) => void;
  refreshServices: () => void;
};
