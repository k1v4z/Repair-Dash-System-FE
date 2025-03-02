import { create } from "zustand";
import { authService } from "@/features/auth/services/auth.service";
import type {
  AuthState,
  AuthStore,
  User,
} from "@/features/auth/types/auth-store.type";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initialState,
  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
  setError: (error: string | null) => set({ error }),
  setLoading: (isLoading: boolean) => set({ isLoading }),

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await authService.login(email, password);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Login failed. Please check your credentials.";
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await authService.logout();
      get().reset();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed.";
      set({ error: message });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: () => {
    set({ isLoading: true, error: null });

    try {
      const isAuthenticated = authService.isAuthenticated();
      const accessToken = authService.getAccessToken();

      if (isAuthenticated && accessToken) {
        set({ isAuthenticated: true, accessToken });
      } else {
        get().reset();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Authentication check failed.";
      set({ error: message });
      get().reset();
    } finally {
      set({ isLoading: false });
    }
  },

  refreshAuthToken: async () => {
    try {
      await authService.refreshToken();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Token refresh failed.";
      set({ error: message });
      get().reset();
      throw err;
    }
  },

  reset: () => {
    set(initialState);
  },
}));
