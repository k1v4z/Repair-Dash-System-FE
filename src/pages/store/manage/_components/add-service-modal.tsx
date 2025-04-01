import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

interface AddServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    service_name: string;
    service_description: string;
    image: File | null;
  }) => void;
}

interface FormData {
  service_name: string;
  service_description: string;
  image: File | null;
}

export function AddServiceModal({
  open,
  onOpenChange,
  onSubmit,
}: AddServiceModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      service_name: "",
      service_description: "",
      image: null,
    },
  });

  const onSubmitForm = (data: FormData) => {
    onSubmit({
      ...data,
      image: image,
    });
    console.log(data);
    reset();
    setImage(null);
    onOpenChange(false);
  };

  const handleImageChange = (file: File) => {
    setImage(file);
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
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="service_description"
                  className="text-sm font-medium"
                >
                  Mô tả dịch vụ
                </label>
                <Textarea
                  id="service_description"
                  {...register("service_description")}
                  placeholder="Nhập mô tả dịch vụ"
                  className="w-full min-h-[150px]"
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
            >
              Hủy
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Thêm dịch vụ
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
