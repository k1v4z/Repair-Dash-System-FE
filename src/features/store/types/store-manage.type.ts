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

export type UpdateServiceRequest ={
  service_name: string;
  service_description: string;
  service_alias?: string;
  service_image?: File | string | null;
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
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  setCurrentPage: (page: number) => void;
  refreshServices: () => void;
  onUpdateService: (updatedService: Service) => void;
};

export type Feedback = {
  id: number;
  customer_name: string;
  service_name: string;
  rating: number;
  content: string;
  created_at: string;
}

export type Employee ={
  employee_id: number;
  employee_full_name: string;
  employee_avatar_url: string | null;
  delete_flag: boolean;
  owner_id: number;
  created_at: string;
  updated_at: string;
  total_orders: number;
  status: boolean;
}

export type EmployeeResponse = {
  employees: Employee[];
  limit: number;
  current_page: number;
  total_pages: number;
}
export type UseEmployeePage = {
  pageSize?: number;
}

export type UseEmployeeReturn = {
  employees: Employee[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: Error | null;
  setCurrentPage: (page: number) => void;
  refreshEmployees: () => Promise<void>;
}