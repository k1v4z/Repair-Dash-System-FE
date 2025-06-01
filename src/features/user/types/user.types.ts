export interface UserResponse {
  user_id: number;
  user_full_name: string;
  user_avatar_url: string | null;
  user_alias: string;
  user_description: string | null;
  user_phone_number: string;
  user_street: string;
  user_ward: string;
  user_district: string;
  user_city: string;
  user_priority: SubscriptionPlan;
  delete_flag: boolean;
  authentication_id: number;
  created_at: string;
  updated_at: string;
  role: string;
  favorite_id: number;
}

export enum SubscriptionPlan {
  FREE = 0,
  MONTHLY = 1,
  YEARLY = 2,
}

export interface UserState {
  user: UserResponse | null;
}

export interface UserStore extends UserState {
  isLoading: boolean;
  error: Error | null;
  getUser: (
    id: number,
    isAuthenticated: boolean
  ) => Promise<UserResponse | null>;
  setUser: (user: UserResponse | null) => void;
  updateUser: () => void;
  reset: () => void;
}
