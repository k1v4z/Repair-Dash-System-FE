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

export type ServiceResponse ={
  listService: Service[];
  totalPages: number;
  currentPage: number;
}

export type Service ={
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
  service_image?: File | null;
  service_alias?: string;
}

export type AddServiceRequest = {
  service_name: string;
  service_description: string;
  service_image: string | File | null;
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
export type Employee ={
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  joined_date: string;
}
export type AddEmployeeRequest = {
  employee_full_name: string;
  avatar_image: string | File | null;
}
export type UpdateEmployeeRequest = {
  employee_full_name: string;
  avatar_image: string | File | null;
}