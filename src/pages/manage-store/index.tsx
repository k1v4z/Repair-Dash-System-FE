import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DateSelect } from "@/components/ui/date-select";
import { AddServiceModal } from "@/features/store/components/add-service-modal";
import SERVICE_DEFAULT_IMG from "@/assets/images/servicedefault.png";
import { DataTable } from "@/components/ui/data-table";
import { storeService } from "@/features/store/services/store.service";
import type { Service } from "@/features/store/types/store.type";

const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "service_name",
    header: "Tên dịch vụ",
    cell: ({ row }) => {
      const image = row.original.service_images_url[0] || SERVICE_DEFAULT_IMG;
      return (
        <div className="flex items-center gap-3">
          <img 
            src={image} 
            alt={row.original.service_name}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <span>{row.original.service_name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "service_description",
    header: "Mô tả dịch vụ",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => (
      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-medium">
        {new Date(row.original.createdAt).toLocaleDateString('vi-VN')}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Ngày cập nhật", 
    cell: ({ row }) => (
      <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">
        {new Date(row.original.updatedAt).toLocaleDateString('vi-VN')}
      </span>
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="text-xl">⋮</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ManageStorePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const response = await storeService.getServicesByOwner("1"); // Tạm thời hardcode owner_id
        setServices(response.data);
      } catch (error) {
        console.error("Failed to load services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleAddService = (data: { service_name: string; service_description: string; image: File | null }) => {
    // Xử lý thêm service sau
    console.log("New service data:", data);
    setOpenAddModal(false);
  };

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý cửa hàng</h1>
        <div className="flex gap-2 items-center">
          <DateSelect 
            value={selectedMonth}
            onChange={setSelectedMonth}
          />
          <Button onClick={() => setOpenAddModal(true)}>Thêm dịch vụ</Button>
        </div>
      </div>
      <DataTable 
        columns={columns} 
        data={services} 
        loading={isLoading}
      />
      <AddServiceModal
        open={openAddModal}
        onOpenChange={setOpenAddModal}
        onSubmit={handleAddService}
      />
    </div>
  );
}
