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
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, type ServiceFormData } from "@/schemas/service";

interface UpdateServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service;
  onSubmit: (data: { 
    service_name: string; 
    service_description: string;
    service_alias: string;
    image: File | null;
  }) => Promise<void>;
  isLoading?: boolean;
}

export function UpdateServiceModal({ 
  open, 
  onOpenChange, 
  service,
  onSubmit,
  isLoading = false
}: UpdateServiceModalProps) {
  const [images, setImages] = useState<File | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      service_name: service?.service_name || "",
      service_description: service?.service_description || "",
      service_alias: service?.service_alias || "",
    }
  });
  
  useEffect(() => {
    if (service) {
      reset({
        service_name: service.service_name,
        service_description: service.service_description,
        service_alias: service.service_alias,
      });
      setImages(null);
    }
  }, [service, reset, open]);

  if (!service) {
    return null;
  }

  const onSubmitForm = async (data: ServiceFormData) => {
    try {
      await onSubmit({
        ...data,
        image: images || null
      });
      onOpenChange(false);
    } catch {
      console.error("Update Error:");
    }
  };

  const handleImageChange = (file: File) => {
    setImages(file);
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
                  className={errors.service_name ? "border-red-500" : "w-full"}
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
                  className={errors.service_alias ? "border-red-500" : "w-full"}
                  helperText={errors.service_alias?.message}
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
                  className={errors.service_description ? "border-red-500" : "w-full min-h-[150px]"}
                />
                {errors.service_description && (
                  <p className="text-red-500 text-sm">{errors.service_description.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50">
              <ImageUpload 
                onImageChange={handleImageChange}
                defaultImage={service.service_image_url || undefined}
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