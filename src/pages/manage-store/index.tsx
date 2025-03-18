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
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { AddServiceRequest, UpdateServiceRequest } from "@/features/store/types/store.type"; 
import { UpdateServiceModal } from "@/features/store/components/update-service-modal";
import { convertMultipleToBase64 } from "@/utils/convert/base64";

export default function ManageStorePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(8);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "service_name",
      header: "Tên dịch vụ",
      cell: ({ row }) => {
        // Xử lý service_images_url có thể là null hoặc string
        let imageUrl;
        if (Array.isArray(row.original.service_images_url) && row.original.service_images_url.length > 0) {
          imageUrl = row.original.service_images_url[0];
        } else if (typeof row.original.service_images_url === 'string') {
          imageUrl = row.original.service_images_url;
        } else {
          imageUrl = SERVICE_DEFAULT_IMG;
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

  useEffect(() => {
    if (shouldRefresh || currentPage) {
      loadServices();
    }
  }, [shouldRefresh, currentPage]);

  const refreshServices = () => {
    setShouldRefresh(true);
  };

  const loadServices = async () => {
    try {
      setShowSkeleton(true);
      
      console.log('Loading services with:', {
        page: currentPage,
        limit: pageSize
      });

      const response = await storeService.getServicesByOwner("1", {
        page: currentPage,
        limit: pageSize
      });
      
      console.log('Response from server:', response);
      
      if (response.data) {
        setServices(response.data.listService);
        setTotalPages(response.data.totalPages);
      }
      
      setTimeout(() => {
        setShowSkeleton(false);
      }, 300);
      
    } catch (error) {
      console.error("Failed to load services:", error);
      setShowSkeleton(false);
    } finally {
      setShouldRefresh(false);
    }
  };

  const handlePageChange = async (page: number) => {
    try {
      setCurrentPage(page);

      const response = await storeService.getServicesByOwner("1", {
        page: page,
        limit: pageSize
      });

      if (response.data) {
        setServices(response.data.listService);
        setTotalPages(response.data.totalPages);
        console.log("Page data:", {
          currentPage: page,
          totalPages: response.data.totalPages,
          services: response.data.listService
        });
      }
    } catch (error) {
      console.error("Failed to change page:", error);
    } finally {
      setShouldRefresh(false);
    }
  };

  const handleAddService = async (data: { service_name: string; service_description: string; images: File[] }) => {
    try {
      setIsAddLoading(true);
      
      const base64Images = await convertMultipleToBase64(data.images);

      const addData: AddServiceRequest = {
        service_name: data.service_name,
        service_description: data.service_description,
        service_images: base64Images
      };

      const addResponse = await storeService.addService(addData);
      console.log('Add response:', addResponse);

      // Đợi một chút để đảm bảo server đã xử lý xong
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Đóng modal
      setOpenAddModal(false);

      // Tải lại dữ liệu của trang hiện tại
      const response = await storeService.getServicesByOwner("1", {
        page: currentPage,
        limit: pageSize
      });

      if (response.data) {
        setServices(response.data.listService);
        setTotalPages(response.data.totalPages);
      }

    } catch (error) {
      console.error("Failed to add service:", error);
    } finally {
      setIsAddLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await storeService.deleteService(deleteId.toString());
      
      // Đóng dialog
      setIsDeleteDialogOpen(false);
      
      // Tải lại dữ liệu
      refreshServices();
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handleUpdate = async (data: { service_name: string; service_description: string; images: File[] }) => {
    if (!selectedService) return;

    try {
      setIsUpdateLoading(true);
      
      // Chỉ xử lý và gửi ảnh khi có ảnh mới được chọn
      const updateData: UpdateServiceRequest = {
        service_name: data.service_name,
        service_description: data.service_description,
      };

      // Chỉ thêm service_images nếu người dùng chọn ảnh mới
      if (data.images && data.images.length > 0) {
        const base64Images = await convertMultipleToBase64(data.images);
        updateData.service_images = base64Images;
      }

      const updateResponse = await storeService.updateService(
        selectedService.service_id.toString(), 
        updateData
      );
      console.log('Update response:', updateResponse);

      setIsUpdateModalOpen(false);

      // Tải lại dữ liệu của trang hiện tại
      const response = await storeService.getServicesByOwner("1", {
        page: currentPage,
        limit: pageSize
      });

      if (response.data) {
        refreshServices();
        setServices(response.data.listService);
        setTotalPages(response.data.totalPages);
      }

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
            pageSize,
            totalPages,
            onPageChange: handlePageChange
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
