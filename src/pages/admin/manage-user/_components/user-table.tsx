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
import { UpdateUserModal } from "./update-user-modal";
import { AddUserModal } from "./add-user-modal";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import Icons from "@/components/icons";
import Pagination from "@/components/common/pagination";
import manageUserServices from "@/features/admin/services/manage-user.service";
import type { User } from "@/features/admin/types/manage-user.type";
import { toast } from "react-toastify";

const ROLE_COLORS = {
  CUSTOMER: "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700",
  STORE:
    "bg-purple-100 text-purple-600 hover:bg-purple-200 hover:text-purple-700",
  ADMIN: "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700",
};

const ROLE_TRANSLATIONS = {
  ADMIN: "Quản trị viên",
  STORE: "Cửa hàng",
  CUSTOMER: "Khách hàng",
};

interface UserTableProps {
  users: User[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  fetchUsers: () => Promise<void>;
}

export default function UserTable({
  users,
  currentPage,
  setCurrentPage,
  totalPages,
  fetchUsers,
}: UserTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLockDialogOpen, setIsLockDialogOpen] = useState(false);
  const [tableUsers, setTableUsers] = useState<User[]>(users);

  // Update local users state when props change
  useEffect(() => {
    setTableUsers(users);
  }, [users]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleLockUser = (user: User) => {
    setSelectedUser(user);
    setIsLockDialogOpen(true);
  };

  const updateUserInList = (updatedUser: User) => {
    const newUsers = tableUsers.map((user) =>
      user.user_id === updatedUser.user_id ? updatedUser : user
    );
    setTableUsers(newUsers);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        const response = await manageUserServices.deleteUser(
          selectedUser.user_id.toString()
        );
        if (response.status === 200) {
          toast.success("Xóa người dùng thành công");
          if (users.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
          fetchUsers();
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        setIsDeleteDialogOpen(false);
      }
    }
  };

  const confirmLock = async () => {
    if (selectedUser) {
      try {
        await manageUserServices.lockUser(selectedUser.user_id);
        toast.success(
          `${
            selectedUser.is_locked ? "Mở" : "Khóa"
          } tài khoản người dùng thành công`
        );
        await fetchUsers();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error(
          `${
            selectedUser.is_locked ? "Mở" : "Khóa"
          } tài khoản người dùng thất bại`
        );
      } finally {
        setIsLockDialogOpen(false);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Thêm người dùng</Button>
      </div>

      <div className="border rounded-[14px] border-[#D5D5D5] overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-[#FCFDFD]">
            <TableRow>
              {[
                "ID",
                "Họ và tên",
                "Email",
                "Số điện thoại",
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
            {tableUsers.map((user) => (
              <TableRow
                key={user.user_id}
                className="border-b hover:bg-gray-50 transition h-[65px] "
              >
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  {user.user_id}
                </TableCell>
                <TableCell className="py-3 pl-6 text-sm text-gray-800 w">
                  <p className="line-clamp-1 w-[250px] break-all">
                    {user.user_full_name}
                  </p>
                </TableCell>
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  <p className="line-clamp-1 w-[250px] break-all">
                    {user.authentication.identifier_email}
                  </p>
                </TableCell>
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  {user.user_phone_number}
                </TableCell>
                <TableCell className="py-3 pl-6 text-sm text-gray-800">
                  <Badge
                    className={`min-w-[80px] px-2 py-1 text-xs justify-center rounded-md ${
                      ROLE_COLORS[
                        user.authentication.role as keyof typeof ROLE_COLORS
                      ]
                    }`}
                  >
                    {
                      ROLE_TRANSLATIONS[
                        user.authentication
                          .role as keyof typeof ROLE_TRANSLATIONS
                      ]
                    }
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
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-8 w-8 p-0 ${
                        user.is_locked
                          ? "text-red-600 hover:text-red-600"
                          : "text-gray-600 hover:text-gray-600"
                      }`}
                      onClick={() => handleLockUser(user)}
                    >
                      <Icons
                        glyph={user.is_locked ? "lock" : "unlock"}
                        className="size-4"
                      />
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

      <AddUserModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        fetchUsers={fetchUsers}
      />

      <UpdateUserModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        user={selectedUser}
        updateUserInList={updateUserInList}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Xác nhận xóa"
        description={`Bạn có chắc chắn muốn xóa người dùng ${
          selectedUser?.user_full_name || ""
        }?`}
        onConfirm={confirmDelete}
        confirmText="Xóa"
      />

      <ConfirmDialog
        open={isLockDialogOpen}
        onOpenChange={setIsLockDialogOpen}
        title={`Xác nhận ${
          selectedUser?.is_locked ? "mở" : "khoá"
        } tài khoản người dùng`}
        description={`Bạn có chắc chắn muốn ${
          selectedUser?.is_locked ? "mở" : "khoá"
        } tài khoản người dùng ${selectedUser?.user_full_name || ""}?`}
        onConfirm={confirmLock}
        confirmText={selectedUser?.is_locked ? "Mở" : "Khoá"}
      />
    </div>
  );
}
