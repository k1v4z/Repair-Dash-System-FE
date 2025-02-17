import { Navigate } from "react-router-dom";
import type { PrivateRouteProps } from "../types/routes.type";

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};
