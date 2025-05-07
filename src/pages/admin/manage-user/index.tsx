import { useState } from "react";
import UserTable from "./_components/user-table";
import Icons from "@/components/icons";
import StatsCard from "./_components/stats-card";
import useFetchUsers from "@/features/admin/hooks/useFetchUser";

const LIMIT = 7;

const ManageUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [identifierEmail] = useState<string>("");
  const [userFullName] = useState<string>("");

  const { users, totalPages, statistics, fetchUsers } = useFetchUsers(
    LIMIT,
    currentPage,
    identifierEmail,
    userFullName
  );

  const stats = [
    {
      title: "Tổng số người dùng",
      value: statistics?.total_users || 0,
      icon: <Icons glyph="profile" className="size-12 text-black" />,
      description: "Tất cả người dùng trong hệ thống",
    },
    {
      title: "Cửa hàng",
      value: statistics?.total_store_users || 0,
      icon: <Icons glyph="store" className="size-12 text-black" />,
      description: "Tất cả người dùng trong hệ thống",
      color:
        "bg-purple-100 text-purple-600 hover:bg-purple-200 hover:text-purple-700",
    },
    {
      title: "Khách hàng",
      value: statistics?.total_customer_users || 0,
      icon: <Icons glyph="userRound" className="size-12 text-black" />,
      description: "Tất cả người dùng trong hệ thống",
      color: "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700",
    },
    {
      title: "Quản trị viên",
      value: statistics?.total_admin_users || 0,
      icon: <Icons glyph="admin" className="size-12 text-black" />,
      description: "Tất cả người dùng trong hệ thống",
      color: "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700",
    },
  ];
  return (
    <div>
      <div className="flex flex-col justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
          <p className="text-gray-600 mt-2">
            Đây là nơi bạn có thể xem, chỉnh sửa và quản lý thông tin người dùng
            trong hệ thống.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-6">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
              color={stat.color}
            />
          ))}
        </div>
      </div>

      <UserTable
        users={users}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        fetchUsers={fetchUsers}
      />
    </div>
  );
};

export default ManageUser;
