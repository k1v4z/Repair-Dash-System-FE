export type FilterType = 'location' | 'price' | 'rating';

export interface FilterOption {
  id: string;
  name: string;
  type: FilterType;
  value?: number;
}

export interface FilterSelectProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export interface Owner {
  user_full_name: string;
  user_street: string;
  user_ward: string;
  user_district: string;
  user_city: string;
  user_phone_number: string;
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
  owner: Owner;
}
