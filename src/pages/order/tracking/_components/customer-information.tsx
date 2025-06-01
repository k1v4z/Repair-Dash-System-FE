import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOrder } from "@/features/order/hooks/useOrder";
import { useAuthStore } from "@/stores/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import FileUpload from "@/components/common/upload-file";
import { convertMultipleUrlToFile } from "@/utils/file";
import { zodResolver } from "@hookform/resolvers/zod";

import { orderUpdateSchema, type OrderUpdateData } from "@/schemas/order";
import type { Order, OrderStatus } from "@/features/order/types/orders.type";
import type { Role } from "@/types/globals.type";

interface CustomerInformationProps {
  order: Order;
  onOrderUpdated: (order: Order | null) => void;
}

export default function CustomerInformation({
  order,
  onOrderUpdated,
}: CustomerInformationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const { updateOrder, isLoading } = useOrder();
  const { user } = useAuthStore();
  const isCustomer = user?.role === ("CUSTOMER" as Role);

  const form = useForm<OrderUpdateData>({
    resolver: zodResolver(orderUpdateSchema),
    defaultValues: {
      customer_full_name: order.customer_full_name,
      customer_phone_number: order.customer_phone_number,
      customer_address: order.customer_address,
      order_description: order.created_description || "",
      order_images: images,
    },
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const convertedFiles = await convertMultipleUrlToFile(
          order.order_images_url
        );

        setImages(convertedFiles);
        form.setValue("order_images", convertedFiles);
      } catch {
        console.error("Error loading images");
      }
    };

    if (order.order_images_url && order.order_images_url.length > 0) {
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDisabled =
    order.order_status === "PROCESSING" ||
    order.order_status === "CANCELED" ||
    order.order_status === "COMPLETED" ||
    !isCustomer;

  const handleSubmit = async (data: OrderUpdateData) => {
    try {
      // Get the current order_images from the form
      const orderImages = form.getValues("order_images") as File[];

      // Create the payload with the images
      const payload = {
        ...data,
        order_status: "PENDING" as OrderStatus,
        order_images: orderImages,
      };

      const updatedOrder = await updateOrder(
        order.order_id.toString(),
        payload
      );

      toast.success("Cập nhật thông tin thành công");
      setIsEditing(false);
      onOrderUpdated(updatedOrder);
    } catch {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = async () => {
    try {
      const convertedFiles = await convertMultipleUrlToFile(
        order.order_images_url
      );
      setImages(convertedFiles);
      form.reset({
        customer_full_name: order.customer_full_name,
        customer_phone_number: order.customer_phone_number,
        customer_address: order.customer_address,
        order_description: order.order_description,
        order_images: convertedFiles,
      });
    } catch {
      console.error("Error resetting form:");
    } finally {
      setIsEditing(false);
    }
  };

  const handleFilesSelected = async (files: File[]) => {
    const currentFiles = (form.getValues("order_images") as File[]) || [];
    const newFiles = [...currentFiles, ...files];
    form.setValue("order_images", newFiles);
    setImages(newFiles);
  };

  const handleImageRemove = async (fileId: string) => {
    const currentFiles = (form.getValues("order_images") as File[]) || [];
    // The fileId is in format "filename-timestamp", so we need to extract the actual filename
    const filename = fileId.split("-")[0];
    const newFiles = currentFiles.filter(
      (file) => !file.name.startsWith(filename)
    );
    form.setValue("order_images", newFiles);
    setImages(newFiles);
  };

  return (
    <Card>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardHeader>
          <CardTitle>Thông tin khách hàng</CardTitle>
          <CardDescription>
            Chi tiết thông tin của khách hàng và mô tả vấn đề
          </CardDescription>
          {!isDisabled && !isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="ml-auto mt-2"
            >
              Chỉnh sửa
            </Button>
          )}
          {isEditing && (
            <div className="flex gap-3 justify-end">
              <Button
                size="sm"
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <Button size="sm" type="submit" disabled={isLoading}>
                {isLoading ? "Đang cập nhật..." : "Lưu thay đổi"}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer_full_name">Họ và tên</Label>
              <Input
                id="customer_full_name"
                className="px-4 py-3"
                disabled
                {...form.register("customer_full_name")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_phone_number">Số điện thoại</Label>
              <Input
                id="customer_phone_number"
                className="px-4 py-3"
                disabled={!isEditing || isDisabled}
                {...form.register("customer_phone_number")}
                helperText={
                  form.formState.errors.customer_phone_number?.message
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer_address">Địa chỉ</Label>
              <Input
                id="customer_address"
                className="px-4 py-3"
                disabled={!isEditing || isDisabled}
                {...form.register("customer_address")}
                helperText={form.formState.errors.customer_address?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order_description">Chi tiết lỗi</Label>
              <Textarea
                id="order_description"
                disabled={!isEditing || isLoading || isDisabled}
                {...form.register("order_description")}
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label>Hình ảnh mô tả lỗi (tối đa 5 ảnh)</Label>
              <FileUpload
                initialFiles={images}
                onFilesSelected={handleFilesSelected}
                onFileRemoved={handleImageRemove}
                multiple
                acceptedFileTypes={["image/png", "image/jpeg"]}
                maxFiles={5}
                disabled={!isEditing || isDisabled}
                buttonText="Tải lên hình ảnh"
              />
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
