import { Navigate } from "react-router-dom";
import type { PrivateRouteProps } from "../types/routes.type";
import { useAuth } from "@/features/auth/hooks/useAuth";
import routePath from "@/config/route";

export const StoreRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={routePath.login} />;
  }

  if (user?.role !== "STORE") {
    return <Navigate to={routePath.unauthorized} />;
  }

  return children;
};
