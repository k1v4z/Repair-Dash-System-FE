import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { UserInfo } from "@/types/human";
import { ROLE_OPTIONS } from "@/constants/role";

interface UpdateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserInfo | null;
}

export function UpdateUserModal({
  open,
  onOpenChange,
  user,
}: UpdateUserModalProps) {
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
      name: "",
      phoneNumber: "",
      role: "CUSTOMER",
      address: "",
      province: "",
      district: "",
      ward: "",
    },
  });

  useEffect(() => {
    if (open && user) {
      reset({
        name: user.user_full_name,
        phoneNumber: user.user_phone_number,
        role: user.role,
        address: user.user_description,
        province: "",
        district: "",
        ward: "",
      });
    }
  }, [user]);

  const handleProvinceChange = (value: string) => {
    provinceChangeHandler(value);
    setValue("province", value, { shouldValidate: true });
    setValue("district", "", { shouldValidate: true });
    setValue("ward", "", { shouldValidate: true });
  };

  const handleDistrictChange = (value: string) => {
    districtChangeHandler(value);
    setValue("district", value, { shouldValidate: true });
    setValue("ward", "", { shouldValidate: true });
  };

  const handleWardChange = (value: string) => {
    wardChangeHandler(value);
    setValue("ward", value, { shouldValidate: true });
  };

  const onSubmit = async (data: SignupFormSchema) => {
    try {
      console.log("Updated user data:", data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error("Không thể cập nhật người dùng. Vui lòng thử lại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
        </DialogHeader>
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
            <div className="grid gap-2">
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
            <Button type="submit">Cập nhật</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
