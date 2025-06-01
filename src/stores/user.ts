import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserResponse, UserStore } from "@/features/user/types/user.types";
import { userService } from "@/features/user/service/user.service";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUser: (user: UserResponse | null) => set({ user }),
      getUser: async (id: number, isAuthenticated: boolean) => {
        const { user } = get();
        if (!user && isAuthenticated) {
          set({ isLoading: true });
          try {
            const userData = await userService.getUserInfo(id);
            set({ user: userData });
          } catch (error) {
            set({ error: error as Error });
          } finally {
            set({ isLoading: false });
          }
        }
        return user;
      },
      updateUser: async () => {
        try {
          set({ isLoading: true });
          const userData = await userService.getUserInfo(
            get().user?.user_id as number
          );
          set({ user: userData });
        } catch (error) {
          set({ error: error as Error });
        } finally {
          set({ isLoading: false });
        }
      },
      isLoading: false,
      error: null,
      reset: () => set(initialState),
    }),
    {
      name: "user-storage",
    }
  )
);
