import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserInfo } from "@/types/human";
import { UpdateUserModal } from "./update-user-modal";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import Icons from "@/components/icons";
import Pagination from "@/components/common/pagination";

const ROLE_COLORS = {
  CUSTOMER: "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700",
  STORE:
    "bg-purple-100 text-purple-600 hover:bg-purple-200 hover:text-purple-700",
  ADMIN: "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700",
};

const userData: UserInfo[] = [
  {
    user_id: 1,
    user_alias: "nguyenvana",
    user_full_name: "Nguyễn Văn A",
    user_avatar_url: "https://example.com/avatar1.jpg",
    user_description: "123 Đường ABC, Quận 1, TP.HCM",
    user_phone_number: "0901234567",
    role: "CUSTOMER",
    favorite_id: null,
  },
  {
    user_id: 2,
    user_alias: "tranthib",
    user_full_name: "Trần Thị B",
    user_avatar_url: "https://example.com/avatar2.jpg",
    user_description: "456 Đường XYZ, Quận 2, TP.HCM",
    user_phone_number: "0912345678",
    role: "STORE",
    favorite_id: null,
  },
  {
    user_id: 3,
    user_alias: "levanc",
    user_full_name: "Lê Văn C",
    user_avatar_url: "https://example.com/avatar3.jpg",
    user_description: "789 Đường DEF, Quận 3, TP.HCM",
    user_phone_number: "0923456789",
    role: "ADMIN",
    favorite_id: null,
  },
  {
    user_id: 4,
    user_alias: "phamthid",
    user_full_name: "Phạm Thị D",
    user_avatar_url: "https://example.com/avatar4.jpg",
    user_description: "321 Đường GHI, Quận 4, TP.HCM",
    user_phone_number: "0934567890",
    role: "CUSTOMER",
    favorite_id: null,
  },
];

export default function UserTable() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserInfo | null>(null);

  useEffect(() => {
    setUsers(userData);
  }, []);

  const handleEdit = (user: UserInfo) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (user: UserInfo) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      console.log("Deleting user:", userToDelete);
    }
    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-5">
      <div className="border rounded-[14px] border-[#D5D5D5] overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-[#FCFDFD]">
            <TableRow>
              {[
                "ID",
                "Họ và tên",
                "Số điện thoại",
                "Địa chỉ",
                "Vai trò",
                "Thao tác",
              ].map((header) => (
                <TableHead
                  key={header}
                  className="text-gray-700 text-sm font-bold uppercase py-3 pl-6 h-[50px] last:pl-8"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {users.map((user) => (
              <TableRow
                key={user.user_id}
                className="border-b hover:bg-gray-50 transition h-[65px]"
              >
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  {user.user_id}
                </TableCell>
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  {user.user_full_name}
                </TableCell>
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  {user.user_phone_number}
                </TableCell>
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  {user.user_description}
                </TableCell>
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  <Badge
                    className={`min-w-[80px] px-2 py-1 text-xs justify-center rounded-md ${
                      ROLE_COLORS[user.role as keyof typeof ROLE_COLORS]
                    }`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEdit(user)}
                    >
                      <Icons glyph="edit" className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      onClick={() => handleDelete(user)}
                    >
                      <Icons glyph="trash" className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <UpdateUserModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        user={selectedUser}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa người dùng ${
          userToDelete?.user_full_name || ""
        }?`}
        onConfirm={confirmDelete}
        confirmText="Xóa"
      />
    </div>
  );
}
