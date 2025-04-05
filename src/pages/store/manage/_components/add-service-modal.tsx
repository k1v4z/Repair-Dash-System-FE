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
import Icon from "@/components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, type ServiceFormData } from "@/schemas/service";
import { toast } from "react-toastify";
import TextareaField from "@/components/common/textarea-field";

interface AddServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    service_name: string;
    service_description: string;
    service_alias: string;
    image: File;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function AddServiceModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: AddServiceModalProps) {
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmitForm = async (data: ServiceFormData) => {
    try {
      await onSubmit({
        ...data,
        image: images[0],
      });
      reset();
      setImages([]);
      toast.success("Thêm dịch vụ mới thành công");
      onOpenChange(false);
    } catch {
      toast.error("Có lỗi xảy ra khi thêm dịch vụ");
    }
  };

  const handleImageChange = (file: File) => {
    setImages([file]);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-4xl">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <ModalHeader className="border-b pb-4">
            <ModalTitle className="text-2xl">Thêm dịch vụ mới</ModalTitle>
            <ModalDescription className="text-gray-500 mt-2">
              Thêm một dịch vụ mới vào hệ thống quản lý cửa hàng
            </ModalDescription>
          </ModalHeader>
          <div className="grid md:grid-cols-2 gap-6 py-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service_name" className="text-sm font-medium">
                  Tên dịch vụ
                </Label>
                <Input
                  id="service_name"
                  {...register("service_name")}
                  placeholder="Nhập tên dịch vụ"
                  helperText={errors.service_name?.message}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service_alias" className="text-sm font-medium">
                  Mã dịch vụ
                </Label>
                <Input
                  id="service_alias"
                  {...register("service_alias")}
                  placeholder="Nhập mã dịch vụ"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="service_description"
                  className="text-sm font-medium"
                >
                  Mô tả dịch vụ
                </Label>
                <TextareaField
                  id="service_description"
                  placeholder="Nhập mô tả dịch vụ"
                  {...register("service_description")}
                  helperText={errors.service_description?.message}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50">
              <ImageUpload
                onImageChange={handleImageChange}
                className="w-full"
              />
            </div>
          </div>
          <ModalFooter className="border-t pt-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
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
              {isLoading ? (
                <>
                  <Icon glyph="loader" className="w-4 h-4 mr-2 animate-spin" />
                  Đang thêm...
                </>
              ) : (
                "Thêm dịch vụ"
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
