export interface SearchServiceParams {
  keyword?: string;
  user_city?: string;
  user_district?: string;
  user_ward?: string;
  user_street?: string;
  index?: number;
  max_range?: number;
  name_only?: string;
}

export interface SearchServiceOwner {
  user_full_name: string;
  user_alias: string;
  user_avatar: string;
  user_priority: number;
}

export interface SearchServiceItem {
  service_id: number;
  service_name: string;
  service_image: string;
  service_alias: string;
  owner_id: number;
  owner: SearchServiceOwner;
  avg_rating: number;
  order_times: number;
  distance: number;
  priority: number;
}

export interface SearchServiceResponse {
  total_pages: number;
  current_page: number;
  services: SearchServiceItem[];
}
