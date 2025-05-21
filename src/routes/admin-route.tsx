import { Navigate, useLocation } from "react-router-dom";
import type { PrivateRouteProps } from "../types/routes.type";
import { useAuth } from "@/features/auth/hooks/useAuth";
import routePath from "@/config/route";

export const AdminRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={routePath.login} state={{ from: location }} />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to={routePath.unauthorized} />;
  }

  return children;
};
