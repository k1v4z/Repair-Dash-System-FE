import { Navigate } from "react-router-dom";
import type { PrivateRouteProps } from "../types/routes.type";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};
