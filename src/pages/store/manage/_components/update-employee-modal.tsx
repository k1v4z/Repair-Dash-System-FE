import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { Employee } from "@/features/store/types/store-manage.type";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { nameValidation } from "@/schemas/helper";

interface UpdateEmployeeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: Employee;
  onSubmit: (data: { 
    employee_full_name: string;
    image: File | null;
  }) => Promise<void>;
  isLoading?: boolean;
}

const employeeFormSchema = z.object({
  employee_full_name: nameValidation,
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

export function UpdateEmployeeModal({ 
  open, 
  onOpenChange, 
  employee,
  onSubmit,
  isLoading = false
}: UpdateEmployeeModalProps) {
  const [images, setImages] = useState<File | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      employee_full_name: employee?.employee_full_name || "",
    }
  });
  
  useEffect(() => {
    if (employee) {
      reset({
        employee_full_name: employee.employee_full_name,
      });
      setImages(null);
    }
  }, [employee, reset, open]);

  if (!employee) {
    return null;
  }

  const onSubmitForm = async (data: EmployeeFormValues) => {
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
            <DialogTitle className="text-2xl">Cập nhật nhân viên</DialogTitle>
            <DialogDescription className="text-gray-500 mt-2">
              Cập nhật thông tin nhân viên của bạn
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-6 py-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employee_full_name" className="text-sm font-medium">
                  Tên nhân viên
                </Label>
                <Input
                  id="employee_full_name"
                  {...register("employee_full_name")}
                  placeholder="Nhập tên nhân viên"
                  className={errors.employee_full_name ? "border-red-500" : "w-full"}
                />
                {errors.employee_full_name && (
                  <p className="text-red-500 text-sm">{errors.employee_full_name.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border rounded-lg p-6 bg-gray-50">
              <ImageUpload 
                onImageChange={handleImageChange}
                defaultImage={employee.employee_avatar_url || undefined}
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
