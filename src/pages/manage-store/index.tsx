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
import { UpdateServiceModal } from "@/features/store/components/update-service-modal";
import type { UpdateServiceRequest } from "@/features/store/types/store.type";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import type { AddServiceRequest } from "@/features/store/types/store.type";

export default function ManageStorePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

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

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddService = async (data: { service_name: string; service_description: string; image: File | null }) => {
    try {
      let base64Image = '';
      if (data.image) {
        base64Image = await convertToBase64(data.image);
        console.log('Base64 Image:', {
          length: base64Image.length,
          preview: base64Image.substring(0, 100) + '...'
        });
      }

      const addData: AddServiceRequest = {
        service_name: data.service_name,
        service_description: data.service_description,
        service_images: base64Image ? [base64Image] : []
      };

      console.log('AddService Request:', addData);

      const response = await storeService.addService(addData);
      console.log('AddService Response:', response);

      // Kiểm tra response.data
      if (!response.data) {
        throw new Error('No data in response');
      }

      // Tạo service mới từ response
      const newService: Service = {
        service_id: Number(response.data.service_id), // Chuyển sang number
        service_name: data.service_name,
        service_description: data.service_description,
        service_images_url: base64Image ? [base64Image] : [],
        delete_flag: false,
        owner_id: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        owner: {
          user_full_name: "Current User",
          user_street: "",
          user_ward: "",
          user_district: "",
          user_city: "",
          user_phone_number: ""
        }
      };

      console.log('New Service Object:', newService);
      
      // Cập nhật state với callback function
      setServices(prevServices => {
        console.log('Previous services:', prevServices);
        const updatedServices = [newService, ...prevServices];
        console.log('Updated services:', updatedServices);
        return updatedServices;
      });

      setOpenAddModal(false);

    } catch (error) {
      console.error("Failed to add service:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await storeService.deleteService(deleteId.toString());
      
      // Cập nhật state trực tiếp thay vì gọi API lại
      setServices(prevServices => 
        prevServices.filter(service => service.service_id !== deleteId)
      );
      
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handleUpdate = async (data: { service_name: string; service_description: string; image: File | null }) => {
    if (!selectedService) return;

    try {
      let base64Image = '';
      if (data.image) {
        base64Image = await convertToBase64(data.image);
      }

      const updateData: UpdateServiceRequest = {
        service_name: data.service_name,
        service_description: data.service_description,
        service_images: base64Image ? [base64Image] : selectedService.service_images_url // Sử dụng ảnh cũ nếu không có ảnh mới
      };

      console.log('Update Request:', updateData);

      const response = await storeService.updateService(
        selectedService.service_id.toString(), 
        updateData
      );

      // Cập nhật state với dữ liệu từ response
      setServices(prevServices => 
        prevServices.map(service => 
          service.service_id === selectedService.service_id 
            ? {
                ...service,
                service_name: data.service_name,
                service_description: data.service_description,
                service_images_url: base64Image ? [base64Image] : service.service_images_url,
                updatedAt: new Date().toISOString()
              }
            : service
        )
      );

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error("Update Error:", error);
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
        />
      )}
    </div>
  );
}
