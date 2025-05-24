import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectField from "@/components/common/select-field";
import { useSelectLocation } from "@/hooks/useSelectLocation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROLE_OPTIONS } from "@/constants/role";
import { User } from "@/features/admin/types/manage-user.type";
import { toast } from "react-toastify";
import manageUserServices from "@/features/admin/services/manage-user.service";
import type { UpdateUserInput } from "@/features/admin/types/manage-user.type";
import type { Role } from "@/types/globals.type";

import { SUBSCRIPTION_PLAN_OPTIONS } from "@/features/subscriptions/constants/subscription-option";
import { updateUserSchema } from "@/schemas/user";
import type { UpdateUserFormSchema } from "@/schemas/user";

interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  updateUserInList: (updatedUser: User) => void;
}

export function UpdateUserModal({
  open,
  onOpenChange,
  user,
  updateUserInList,
}: UpdateUserModalProps) {
  const {
    handleProvinceChange: provinceChangeHandler,
    handleDistrictChange: districtChangeHandler,
    handleWardChange: wardChangeHandler,
    provinces,
    districts,
    wards,
  } = useSelectLocation({
    initialProvince: user?.user_city,
    initialDistrict: user?.user_district,
    initialWard: user?.user_ward,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.user_full_name,
        phoneNumber: user.user_phone_number,
        role: user.authentication.role,
        address: user.user_street,
        user_city: user.user_city,
        user_district: user.user_district,
        user_ward: user.user_ward,
        user_priority: user.user_priority?.toString() || "0",
        password: "",
      });

      provinceChangeHandler(user.user_city);
      districtChangeHandler(user.user_district);
      wardChangeHandler(user.user_ward);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleProvinceChange = (value: string) => {
    provinceChangeHandler(value);
    setValue("user_city", value, { shouldValidate: true });
    setValue("user_district", "", { shouldValidate: true });
    setValue("user_ward", "", { shouldValidate: true });
  };

  const handleDistrictChange = (value: string) => {
    districtChangeHandler(value);
    setValue("user_district", value, { shouldValidate: true });
    setValue("user_ward", "", { shouldValidate: true });
  };

  const handleWardChange = (value: string) => {
    wardChangeHandler(value);
    setValue("user_ward", value, { shouldValidate: true });
  };

  const handleCancel = () => {
    if (user) {
      reset({
        name: user.user_full_name,
        phoneNumber: user.user_phone_number,
        role: user.authentication.role,
        address: user.user_street,
        user_city: user.user_city,
        user_district: user.user_district,
        user_ward: user.user_ward,
        user_priority: user.user_priority?.toString() || "0",
        password: "",
      });

      provinceChangeHandler(user.user_city);
      districtChangeHandler(user.user_district);
      wardChangeHandler(user.user_ward);
    }
    onOpenChange(false);
  };

  const onSubmit = async (data: UpdateUserFormSchema) => {
    if (!user) return;

    try {
      const updateUserData: UpdateUserInput = {
        user_full_name: data.name,
        password: data.password || "", // Include empty string if no password provided
        user_phone_number: data.phoneNumber,
        user_street: data.address,
        user_ward: data.user_ward,
        user_district: data.user_district,
        user_city: data.user_city,
        user_priority: Number(data.user_priority),
        role: data.role as Role,
      };

      const response = await manageUserServices.updateUser(
        updateUserData,
        user.user_id
      );

      if (response) {
        toast.success("Cập nhật người dùng thành công");
        onOpenChange(false);

        // Convert API response to User format and update user list
        const updatedUser: User = {
          user_id: response.user_id,
          user_full_name: response.user_full_name,
          user_avatar_url: response.user_avatar_url,
          user_alias: response.user_alias,
          user_description: response.user_description,
          user_phone_number: response.user_phone_number,
          user_street: response.user_street,
          user_ward: response.user_ward,
          user_district: response.user_district,
          user_city: response.user_city,
          user_priority: response.user_priority,
          delete_flag: response.delete_flag,
          authentication_id: response.authentication_id,
          authentication: {
            authentication_id: response.authentication.authentication_id,
            identifier_email: response.authentication.identifier_email,
            password: response.authentication.password,
            role: response.authentication.role,
          },
          is_locked: user.is_locked, // Preserve lock status since it's not returned in response
        };

        updateUserInList(updatedUser);
      }
    } catch {
      toast.error("Không thể cập nhật người dùng. Vui lòng thử lại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Form cập nhật thông tin người dùng
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  placeholder="Nhập họ và tên"
                  {...register("name")}
                  className="h-[45.33px]"
                  helperText={errors.name?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  {...register("phoneNumber")}
                  className="h-[45.33px]"
                  helperText={errors.phoneNumber?.message}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`grid gap-2 ${watch("role") !== "STORE" ? "col-span-2" : ""}`}>
                <Label>Vai trò</Label>
                <SelectField
                  placeholder="Chọn vai trò"
                  options={ROLE_OPTIONS}
                  value={watch("role")}
                  onValueChange={(value) =>
                    setValue("role", value, { shouldValidate: true })
                  }
                  helperText={errors.role?.message}
                  {...register("role")}
                />
              </div>
              {watch("role") === "STORE" && (
                <div className="grid gap-2">
                  <Label>Gói đăng ký</Label>
                  <SelectField
                    placeholder="Chọn gói đăng ký"
                    options={SUBSCRIPTION_PLAN_OPTIONS}
                    value={watch("user_priority")}
                    onValueChange={(value) =>
                      setValue("user_priority", value, { shouldValidate: true })
                    }
                    helperText={errors.user_priority?.message}
                    {...register("user_priority")}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu (tùy chọn)</Label>
              <Input
                id="password"
                type="password"
                placeholder="Để trống nếu không muốn thay đổi mật khẩu"
                {...register("password")}
                className="h-[45.33px]"
                helperText={errors.password?.message}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  placeholder="Nhập số nhà, tên đường..."
                  {...register("address")}
                  className="h-[45.33px]"
                  helperText={errors.address?.message}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Tỉnh / Thành</Label>
                  <SelectField
                    placeholder="Chọn tỉnh / thành phố"
                    defaultValue={user?.user_city}
                    onValueChange={handleProvinceChange}
                    options={provinces}
                    helperText={errors.user_city?.message}
                    {...register("user_city")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Quận / Huyện</Label>
                  <SelectField
                    placeholder="Chọn quận / huyện"
                    defaultValue={user?.user_district}
                    onValueChange={handleDistrictChange}
                    options={districts}
                    helperText={errors.user_district?.message}
                    {...register("user_district")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Phường / Xã</Label>
                  <SelectField
                    placeholder="Chọn phường / xã"
                    defaultValue={user?.user_ward}
                    onValueChange={handleWardChange}
                    options={wards}
                    helperText={errors.user_ward?.message}
                    {...register("user_ward")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
