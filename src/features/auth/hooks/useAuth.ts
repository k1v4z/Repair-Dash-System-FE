import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/stores/auth";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
    setError,
  } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Handle login with navigation
  const handleLogin = useCallback(
    async (email: string, password: string, redirectPath?: string) => {
      try {
        await login(email, password);

        // If login successful and role exists, proceed with navigation
        const from =
          redirectPath ||
          (location.state as { from?: { pathname: string } })?.from?.pathname ||
          "/";
        navigate(from);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Error is already handled in the store
      }
    },
    [login, navigate, location.state]
  );

  // Handle logout with navigation
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      // Error is already handled in the store
    }
  }, [logout, navigate]);

  // Clear any error messages
  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    clearError,
  };
};
