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
import { DataTable } from "@/components/common/data-table";
import { storeService } from "@/features/store/services/store.service";
import type { Service } from "@/features/store/types/store.type";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import type { AddServiceRequest, UpdateServiceRequest } from "@/features/store/types/store.type"; 
import { UpdateServiceModal } from "@/features/store/components/update-service-modal";
import { convertToBase64 } from "@/utils/convert/base64";
import { formatDate } from "@/utils/datetime/date";
import {userAutoGenerateAlisas} from "@/hooks/userAutoGenerateAlisas";
import { useGetServiceByOwner } from "@/features/store/hooks/useGetServiceByOwner";
const pageSize = 8;
export default function ManageStorePage() {
  const {
    services,
    setServices,
    currentPage,
    totalPages,
    isLoading: showSkeleton,
    setCurrentPage,
    refreshServices
  } = useGetServiceByOwner(
      pageSize
  );

  const [selectedMonth, setSelectedMonth] = useState("March");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "service_name",
      header: "Tên dịch vụ",
      cell: ({ row }) => {
        let imageUrl = SERVICE_DEFAULT_IMG;
        const images = row.original.service_image_url;
        if (images) {
          imageUrl = images;
        }
        return (
          <div className="flex items-center gap-3">
            <img 
              src={imageUrl} 
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
          {formatDate(new Date(row.original.created_at),'vi-VN')}
        </span>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Ngày cập nhật", 
      cell: ({ row }) => (
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">
              {formatDate(new Date(row.original.updated_at),'vi-VN')}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="text-xl">⋮</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedService(row.original);
                  setIsUpdateModalOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => {
                  setDeleteId(row.original.service_id);
                  setIsDeleteDialogOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddService = async (data: { service_name: string; service_description: string; image: File }) => {
    try {
      setIsAddLoading(true);
      if (!data.image) {
        throw new Error('No image provided');
      }
      const base64Image = await convertToBase64(data.image);
      
      const addData: AddServiceRequest = {
        service_name: data.service_name,
        service_description: data.service_description,
        service_image: base64Image,
        service_alias: userAutoGenerateAlisas(data.service_name), 
      };

      const addResponse = await storeService.addService(addData);

      if (addResponse) {
        refreshServices();
      }
    } catch (error) {
      console.error("Add Error:", error);
    } finally {
      setIsAddLoading(false);      
      setOpenAddModal(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await storeService.deleteService(deleteId.toString());
      setIsDeleteDialogOpen(false);
      refreshServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };
  
  const handleUpdate = async (data: { service_name: string; service_description: string; image?: File | null }) => {
    if (!selectedService) return;

    try {
      setIsUpdateLoading(true);
      
      const updateData: UpdateServiceRequest = {
        service_name: data.service_name,
        service_description: data.service_description,
        service_image: data.image ? await convertToBase64(data.image) : undefined
      };

      const updateResponse = await storeService.updateService(
        selectedService.service_id.toString(), 
        updateData
      );
      // Cập nhật state services với dữ liệu trả về từ API
      if (updateResponse.data.result) {
        setServices((prevServices: Service[]) => 
          prevServices.map(service => 
            service.service_id === selectedService.service_id
              ? updateResponse.data.result
              : service 
          )
        );
      }

      setIsUpdateModalOpen(false);

    } catch (error) {
      console.error("Update Error:", error);
    } finally {
      setIsUpdateLoading(false);
    }
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
      <div className="transition-opacity duration-300 ease-in-out">
        <DataTable 
          columns={columns} 
          data={services} 
          loading={showSkeleton}
          pagination={{
            currentPage,
            pageSize: 8,
            totalPages,
            onPageChange: setCurrentPage
          }}
        />
      </div>
      <AddServiceModal
        open={openAddModal}
        onOpenChange={setOpenAddModal}
        onSubmit={handleAddService}
        isLoading={isAddLoading}
      />
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa dịch vụ này? Hành động này không thể hoàn tác."
        onConfirm={handleDelete}
        confirmText="Xóa"
      />
      {selectedService && (
        <UpdateServiceModal
          open={isUpdateModalOpen}
          onOpenChange={setIsUpdateModalOpen}
          service={selectedService}
          onSubmit={handleUpdate}
          isLoading={isUpdateLoading}
        />
      )}
    </div>
  );
}
