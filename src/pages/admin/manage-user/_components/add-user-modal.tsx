import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectField from "@/components/common/select-field";
import { useSelectLocation } from "@/hooks/useSelectLocation";
import { signupSchema, type SignupFormSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ROLE_OPTIONS } from "@/constants/role";
import { toast } from "react-toastify";
import type { AddUserInput } from "@/features/admin/types/manage-user.type";
import manageUserServices from "@/features/admin/services/manage-user.service";

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fetchUsers: () => void;
}

export function AddUserModal({
  open,
  onOpenChange,
  fetchUsers,
}: AddUserModalProps) {
  const {
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleProvinceChange: provinceChangeHandler,
    handleDistrictChange: districtChangeHandler,
    handleWardChange: wardChangeHandler,
    provinces,
    districts,
    wards,
  } = useSelectLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "CUSTOMER",
      province: "",
      district: "",
      ward: "",
    },
  });

  const handleProvinceChange = (value: string) => {
    provinceChangeHandler(value);
    setValue("province", value, { shouldValidate: !!value });
    setValue("district", "", { shouldValidate: false });
    setValue("ward", "", { shouldValidate: false });
  };

  const handleDistrictChange = (value: string) => {
    districtChangeHandler(value);
    setValue("district", value, { shouldValidate: !!value });
    setValue("ward", "", { shouldValidate: false });
  };

  const handleWardChange = (value: string) => {
    wardChangeHandler(value);
    setValue("ward", value, { shouldValidate: !!value });
  };

  const onSubmit = async (data: SignupFormSchema) => {
    try {
      const addUserData: AddUserInput = {
        identifier_email: data.email,
        password: data.password,
        role: data.role as "STORE" | "CUSTOMER" | "ADMIN",
        user_full_name: data.name,
        user_phone_number: data.phoneNumber,
        user_street: data.address,
        user_ward: data.ward,
        user_district: data.district,
        user_city: data.province,
      };
      const response = await manageUserServices.addUser(addUserData);
      if (response.status === 201) {
        toast.success("Thêm người dùng thành công");
        fetchUsers();
        onOpenChange(false);
        reset({
          name: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "CUSTOMER",
          address: "",
          province: "",
          district: "",
          ward: "",
        });
        handleProvinceChange("");
        handleDistrictChange("");
        handleWardChange("");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thêm người dùng mới</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2 pb-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  placeholder="Nhập họ và tên"
                  {...register("name")}
                  className="h-[45.33px]"
                  helperText={errors.name?.message}
                />
              </div>
              <div className="grid gap-2 pb-2">
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

            <div className="grid gap-2 pb-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="Nhập địa chỉ email"
                {...register("email")}
                className="h-[45.33px]"
                helperText={errors.email?.message}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2 pb-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  {...register("password")}
                  className="h-[45.33px]"
                  helperText={errors.password?.message}
                />
              </div>
              <div className="grid gap-2 pb-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  {...register("confirmPassword")}
                  className="h-[45.33px]"
                  helperText={errors.confirmPassword?.message}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Vai trò</Label>
              <SelectField
                placeholder="Chọn vai trò"
                options={ROLE_OPTIONS}
                value={watch("role")}
                onValueChange={(value) =>
                  setValue("role", value, { shouldValidate: true })
                }
                {...register("role")}
                helperText={errors.role?.message}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2 pb-2">
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
                  <Label>Tỉnh/Thành</Label>
                  <SelectField
                    placeholder="Chọn tỉnh / thành"
                    value={selectedProvince}
                    onValueChange={handleProvinceChange}
                    options={provinces}
                    helperText={errors.province?.message}
                    {...register("province")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Quận/Huyện</Label>
                  <SelectField
                    placeholder="Chọn quận / huyện"
                    disabled={!selectedProvince}
                    value={selectedDistrict}
                    onValueChange={handleDistrictChange}
                    options={districts}
                    helperText={errors.district?.message}
                    {...register("district")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Phường/Xã</Label>
                  <SelectField
                    placeholder="Chọn phường / xã"
                    disabled={!selectedDistrict}
                    value={selectedWard}
                    onValueChange={handleWardChange}
                    options={wards}
                    helperText={errors.ward?.message}
                    {...register("ward")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit">Thêm</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
