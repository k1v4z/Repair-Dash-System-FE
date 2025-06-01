import type { Role } from "@/types/globals.type";

export interface User {
  user_id: number | null;
  auth_status: boolean;
  email: string;
  role?: Role;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
  refreshAuthToken: () => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

export interface LoginResponse {
  status: number;
  data?: {
    user_id?: number;
  };
  code?: string;
}

export interface AuthResponse {
  auth_status: boolean;
  user_id: number | null;
}

export interface AuthStatus {
  auth_status: boolean;
  user_id: number | null;
  role?: Role;
}

export interface RegisterInput {
  identifier_email: string;
  password: string;
  role: "STORE" | "CUSTOMER";
  user_full_name: string;
  user_phone_number: string;
  user_street: string;
  user_ward: string;
  user_district: string;
  user_city: string;
}
export interface ResetPasswordState {
  loading: boolean;
  otpSent: boolean;
  otpVerified: boolean;
  success: boolean;
}
