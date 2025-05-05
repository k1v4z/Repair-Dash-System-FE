import { useState, useEffect } from "react";
import manageUserServices from "@/features/admin/services/manage-user.service";
import type { User } from "@/features/admin/types/manage-user.type";
import type { Statistics } from "@/features/admin/types/manage-user.type";
import { toast } from "react-toastify";

const useFetchUsers = (
  limit: number,
  currentPage: number,
  identifierEmail: string,
  userFullName: string
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  console.log(statistics);

  const fetchUsers = async () => {
    try {
      const response = await manageUserServices.getAllUsers(
        currentPage,
        limit,
        identifierEmail,
        userFullName
      );
      setUsers(response.users);
      console.log(response.total_users);

      setStatistics({
        total_users: response.total_users,
        total_store_users: response.total_store_users,
        total_customer_users: response.total_customer_users,
        total_admin_users: response.total_admin_users,
      });
      setTotalPages(response.total_page);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(
        "Đã có lỗi xảy ra khi lấy danh sách người dùng. Vui lòng thử lại"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, identifierEmail, userFullName]);

  return {
    users,
    totalPages,
    fetchUsers,
    statistics,
  };
};

export default useFetchUsers;
