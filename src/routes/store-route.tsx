import { Navigate, useLocation } from "react-router-dom";
import type { PrivateRouteProps } from "../types/routes.type";
import { useAuth } from "@/features/auth/hooks/useAuth";
import routePath from "@/config/route";

export const StoreRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={routePath.login} state={{ from: location }} />;
  }

  if (user?.role !== "STORE") {
    return <Navigate to={routePath.unauthorized} />;
  }

  return children;
};
