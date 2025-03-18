import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import Icon from "@/components/icons";
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
    image: File | null;
  }) => Promise<void>;
}

interface FormData {
  service_name: string;
  service_description: string;
  image: File | null;
}

export function UpdateServiceModal({ 
  open, 
  onOpenChange, 
  service,
  onSubmit 
}: UpdateServiceModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, reset } = useForm<FormData>();
  
  useEffect(() => {
    if (service) {
      reset({
        service_name: service.service_name,
        service_description: service.service_description,
      });
    }
  }, [service, reset]);

  const onSubmitForm = async (data: FormData) => {
    try {
      setIsLoading(true);
      await onSubmit({
        ...data,
        image: image
      });
      reset();
      setImage(null);
      // Modal sẽ được đóng từ component cha sau khi update thành công
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (file: File) => {
    setImage(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                defaultImage={service.service_images_url[0]}
                className="w-full"
              />
            </div>
          </div>

          <DialogFooter className="border-t pt-4 mt-4">
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
                  Đang cập nhật...
                </>
              ) : (
                'Cập nhật'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 