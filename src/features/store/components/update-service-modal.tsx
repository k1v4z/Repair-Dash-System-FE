import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Service } from "@/features/store/types/store.type";

interface UpdateServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service;
  onSubmit: (data: { 
    service_name: string; 
    service_description: string;
    images: File[];
  }) => Promise<void>;
  isLoading?: boolean;
}

interface FormData {
  service_name: string;
  service_description: string;
  images: File[];
}

export function UpdateServiceModal({ 
  open, 
  onOpenChange, 
  service,
  onSubmit,
  isLoading = false
}: UpdateServiceModalProps) {
  const [images, setImages] = useState<File[]>([]);
  
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      service_name: service.service_name,
      service_description: service.service_description,
    }
  });
  
  useEffect(() => {
    if (service) {
      reset({
        service_name: service.service_name,
        service_description: service.service_description,
      });
      setImages([]);
    }
  }, [service, reset, open]);

  const onSubmitForm = async (data: FormData) => {
    try {
      await onSubmit({
        ...data,
        images: images
      });
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleImageChange = (file: File) => {
    setImages([file]);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isLoading) {
        onOpenChange(isOpen);
      }
    }}>
      <DialogContent className="max-w-4xl">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl">Cập nhật dịch vụ</DialogTitle>
            <DialogDescription className="text-gray-500 mt-2">
              Cập nhật thông tin dịch vụ của bạn
            </DialogDescription>
          </DialogHeader>

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
                <Label htmlFor="service_description" className="text-sm font-medium">
                  Mô tả dịch vụ
                </Label>
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
                defaultImage={
                  Array.isArray(service.service_images_url) && service.service_images_url.length > 0
                    ? service.service_images_url[0]
                    : typeof service.service_images_url === 'string'
                      ? service.service_images_url
                      : undefined
                }
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter className="border-t pt-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => !isLoading && onOpenChange(false)}
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
              {isLoading ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 