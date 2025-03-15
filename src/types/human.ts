export interface UserInfo {
  user_id: number;
  user_full_name: string;
  user_phone_number: string;
}

export interface Employee {
  employee_id: number;
  employee_full_name: string;
  owner_id: number;
  createdAt: string;
  updatedAt: string;
}
