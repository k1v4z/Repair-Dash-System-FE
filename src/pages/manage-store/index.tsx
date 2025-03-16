import { useState } from "react";
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
import { SERVICE_DATA } from "@/features/store/constants/service";
import { DataTable } from "@/components/ui/data-table";

interface Service {
  service_name: string;
  service_description: string;
  created_at: string;
  updated_at: string;
  image?: string;
}

const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "service_name",
    header: "Tên dịch vụ",
    cell: ({ row }) => {
      const image = row.original.image || SERVICE_DEFAULT_IMG;
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
    accessorKey: "created_at",
    header: "Ngày tạo",
    cell: ({ row }) => (
      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800 font-medium">
        {row.original.created_at}
      </span>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Ngày cập nhật", 
    cell: ({ row }) => (
      <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">
        {row.original.updated_at}
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
  const [services, setServices] = useState<Service[]>(SERVICE_DATA);

  const [selectedMonth, setSelectedMonth] = useState("March");
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleAddService = (data: { service_name: string; service_description: string }) => {
    const newService = {
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setServices([...services, newService]);
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
      <DataTable columns={columns} data={services} />
      <AddServiceModal
        open={openAddModal}
        onOpenChange={setOpenAddModal}
        onSubmit={handleAddService}
      />
    </div>
  );
}
