import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";

export const useUser = () => {
  const { user: authUser } = useAuthStore();
  const { getUser, user: userDetail } = useUserStore();
  useEffect(() => {
    async function fetchUser() {
      if (authUser?.user_id && authUser.auth_status) {
        await getUser(authUser.user_id, authUser.auth_status);
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user: userDetail };
};
