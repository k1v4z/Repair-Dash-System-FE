import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal";
import { ImageUpload } from "@/components/ui/image-upload";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema, type EmployeeFormData } from "@/schemas/employee";

interface AddEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    employee_full_name: string;
    image: File | null;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function AddEmployeeModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: AddEmployeeModalProps) {
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      employee_full_name: "",
    },
  });

  const handleImageChange = (file: File) => {
    setImages([file]);
  };

  const handleCancel = () => {
    reset();
    setImages([]);
    onOpenChange(false);
  };

  const onSubmitForm = async (data: EmployeeFormData) => {
    await onSubmit({
      ...data,
      image: images[0] || null,
    });
    reset();
    setImages([]);
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-4xl h-max">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <ModalHeader className="border-b pb-4">
            <ModalTitle className="text-2xl">Thêm nhân viên mới</ModalTitle>
            <ModalDescription className="text-gray-500 mt-2">
              Thêm một nhân viên mới vào hệ thống quản lý cửa hàng
            </ModalDescription>
          </ModalHeader>
          <div className="space-y-6 flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="employee_full_name" className="text-sm font-medium">
                Tên nhân viên
              </Label>
              <Input
                id="employee_full_name"
                {...register("employee_full_name")}
                placeholder="Nhập tên nhân viên"
                className={errors.employee_full_name ? "border-red-500" : ""}
                helperText={errors.employee_full_name?.message}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50 mt-4">
            <ImageUpload
              onImageChange={handleImageChange}
              className="w-full"
            />
          </div>
          <ModalFooter className="border-t pt-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="mr-2"
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Đang thêm" : "Thêm nhân viên"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}