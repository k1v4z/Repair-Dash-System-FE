export type FilterType = 'location' | 'price' | 'rating';

export type FilterOption = {
  id: string;
  name: string;
  type: FilterType;
  value?: number;
}

export type FilterSelectProps = {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export type Owner = {
  user_full_name: string;
  user_street: string;
  user_ward: string;
  user_district: string;
  user_city: string;
  user_phone_number: string;
}

export interface ServiceResponse {
  data: {
    message: string;
    listService: Service[];
    limit: number;
    index: number;
    totalPages: number;
  };
}

export interface Service {
  service_id: number;
  service_name: string;
  service_images_url: string[];
  service_description: string;
  delete_flag: boolean;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    user_full_name: string;
    user_street: string;
    user_ward: string;
    user_district: string;
    user_city: string;
    user_phone_number: string;
  };
}

export type UpdateServiceRequest = {
  service_name: string;
  service_description: string;
  service_images?: string[];
}

export type AddServiceRequest = {
  service_name: string;
  service_description: string;
  service_images: string[];
}

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
    }
  }
}

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
    }
  }
}
