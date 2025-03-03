import { Navigate } from "react-router-dom";
import type { PrivateRouteProps } from "../types/routes.type";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const PublicRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" />;
};
