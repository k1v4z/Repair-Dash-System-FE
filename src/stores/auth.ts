import { create } from "zustand";
import { authService } from "@/features/auth/services/auth.service";
import type {
  AuthState,
  AuthStore,
  User,
} from "@/features/auth/types/auth-store.type";

const initialState: AuthState = {
  user: null,
  //accessToken: null,
  //refreshToken: null,
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

      // Check auth status after successful login
      const status = await authService.checkAuthStatus();

      if (!status.role) {
        set({
          error: "Tài khoản của bạn đã bị khoá",
          isAuthenticated: false,
        });
        throw new Error("Account is locked");
      }

      set({
        isAuthenticated: true,
      });
    } catch (err) {
      if (!(err instanceof Error && err.message === "Account is locked")) {
        set({ error: "Email hoặc mật khẩu không đúng. Vui lòng thử lại!" });
      }
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
      set({ error: "Logout failed." });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null });

    //Temporarily logic to check if user is authenticated, improve later
    try {
      const status = await authService.checkAuthStatus();

      if (!status.auth_status) {
        try {
          await authService.refreshToken();
          set({ isAuthenticated: true });
        } catch {
          get().reset();
        }
      } else {
        set({
          isAuthenticated: true,
          user: {
            user_id: status.user_id,
            auth_status: status.auth_status,
            email: "",
            role: status.role,
          },
        });
      }
    } catch {
      set({ error: "Authentication check failed." });
      get().reset();
    } finally {
      set({ isLoading: false });
    }
  },

  refreshAuthToken: async () => {
    try {
      await authService.refreshToken();
    } catch (err) {
      set({ error: "Token refresh failed." });
      get().reset();
      throw err;
    }
  },

  reset: () => {
    set(initialState);
  },
}));
