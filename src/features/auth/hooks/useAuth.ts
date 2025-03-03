import { useCallback, useEffect } from "react";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
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
    async (email: string, password: string) => {
      try {
        await login(email, password);
        navigate("/");
      } catch {
        // Error is already handled in the store
      }
    },
    [login, navigate]
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
