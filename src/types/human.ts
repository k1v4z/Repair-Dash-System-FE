export interface UserInfo {
  user_id: number;
  user_alias: string;
  user_full_name: string;
  user_avatar_url: string;
  user_description: string;
  user_phone_number: string;
  role: string;
  favorite_id: null | -1 | number;
}

export interface Employee {
  employee_id: number;
  employee_full_name: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
}
