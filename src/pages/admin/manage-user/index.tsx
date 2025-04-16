import { useState } from "react";
import UserTable from "./_components/user-table";
import { AddUserModal } from "./_components/add-user-modal";
import { Button } from "@/components/ui/button";

const ManageUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
          <p className="text-gray-600 mt-2">
            Đây là nơi bạn có thể xem, chỉnh sửa và quản lý thông tin người dùng trong hệ thống.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Thêm người dùng</Button>
      </div>
      
      <AddUserModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <UserTable />
    </div>
  );
};

export default ManageUser;
