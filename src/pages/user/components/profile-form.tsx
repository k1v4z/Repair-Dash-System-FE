import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/icons";
import type { ProfileResponse } from "@/features/user/types/profile.type";
import { useForm } from "react-hook-form";
import SelectField from "@/components/common/select-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/schemas/profile";
import { useSelectLocation } from "@/hooks/useSelectLocation";

interface ProfileFormProps {
  profile: ProfileResponse;
  onProfileChange: (
    data: Partial<ProfileResponse>,
    showToast?: boolean
  ) => Promise<ProfileResponse | undefined>;
}

export function ProfileForm({ profile, onProfileChange }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      user_full_name: profile.user_full_name,
      user_phone_number: profile.user_phone_number,
      user_description: profile.user_description === null ? undefined : profile.user_description,
      user_street: profile.user_street,
      user_ward: profile.user_ward,
      user_district: profile.user_district,
      user_city: profile.user_city,
    },
  });

  const isStore = profile.authentication?.role === "STORE";
  const {
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleProvinceChange: provinceChangeHandler,
    handleDistrictChange: districtChangeHandler,
    handleWardChange: wardChangeHandler,
    districts,
    wards,
    provinces,
  } = useSelectLocation({
    initialProvince: profile.user_city,
    initialDistrict: profile.user_district,
    initialWard: profile.user_ward,
  });

  const handleProvinceChange = (value: string) => {
    provinceChangeHandler(value);
    setValue("user_city", value, { shouldValidate: true });
  };

  const handleDistrictChange = (value: string) => {
    districtChangeHandler(value);
    setValue("user_district", value, { shouldValidate: true });
  };

  const handleWardChange = (value: string) => {
    wardChangeHandler(value);
    setValue("user_ward", value, { shouldValidate: true });
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const updateData = {
        user_full_name: data.user_full_name,
        user_phone_number: data.user_phone_number,
        user_street: data.user_street,
        user_ward: data.user_ward,
        user_district: data.user_district,
        user_city: data.user_city,
        ...(isStore ? { user_description: data.user_description } : {})
      };

      await onProfileChange(updateData, true);
    } catch {
      // Handle error silently
    }
  };

  const handleCancel = () => {
    reset({
      user_full_name: profile.user_full_name,
      user_phone_number: profile.user_phone_number,
      user_description: profile.user_description === null ? undefined : profile.user_description,
      user_street: profile.user_street,
      user_ward: profile.user_ward,
      user_district: profile.user_district,
      user_city: profile.user_city,
    });
  };

  return (
    <Card className="md:col-span-3 border-primary/20">
      <CardHeader className="border-b border-primary/20">
        <CardTitle>Thông tin cá nhân</CardTitle>
        <CardDescription>
          Cập nhật thông tin cá nhân và địa chỉ của bạn
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2 mb-6">
              <Label htmlFor="user_full_name">
                Họ và tên
                <span className="text-destructive ml-1">*</span>
              </Label>
              <Input
                id="user_full_name"
                {...register("user_full_name")}
                className="border-primary/20 focus-visible:ring-primary-royalBlue py-2"
                helperText={errors.user_full_name?.message}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="grid gap-2">
                <Label htmlFor="user_phone_number">
                  Số điện thoại
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input
                  id="user_phone_number"
                  {...register("user_phone_number")}
                  className="border-primary/20 focus-visible:ring-primary-royalBlue py-2"
                  helperText={errors.user_phone_number?.message}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.authentication?.identifier_email || ""}
                  disabled
                  className="border-primary/20 focus-visible:ring-primary py-2"
                />
              </div>
            </div>

            {isStore && (
              <div className="grid gap-2 mt-4 mb-6">
                <Label htmlFor="user_description">Mô tả</Label>
                <Textarea
                  id="user_description"
                  {...register("user_description")}
                  placeholder="Thêm mô tả về bạn"
                  className="border-primary/20 focus-visible:ring-primary-royalBlue py-2 min-h-[150px] resize-none"
                />
                {errors.user_description && (
                  <p className="text-xs text-destructive">
                    {errors.user_description.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <Separator className="bg-primary/20" />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">Địa chỉ</h3>
              <Icon glyph="location" className="w-4 h-4" />
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2 mb-6">
                <Label htmlFor="user_street">Đường</Label>
                <Input
                  id="user_street"
                  {...register("user_street")}
                  className="border-primary/20 focus-visible:ring-primary-royalBlue py-2"
                  helperText={errors.user_street?.message}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="grid gap-2 mb-6">
                  <Label htmlFor="user_city">Thành phố</Label>
                  <SelectField
                    placeholder="Chọn thành phố"
                    options={provinces}
                    value={selectedProvince}
                    onValueChange={handleProvinceChange}
                    triggerClassName="border-primary/20 focus:ring-1 focus:ring-primary-royalBlue"
                    helperText={errors.user_city?.message}
                  />
                </div>

                <div className="grid gap-2 mb-6">
                  <Label htmlFor="user_district">Quận/Huyện</Label>
                  <SelectField
                    placeholder="Chọn quận/huyện"
                    options={districts}
                    value={selectedDistrict}
                    onValueChange={handleDistrictChange}
                    disabled={!selectedProvince}
                    triggerClassName="border-primary/20 focus:ring-1 focus:ring-primary-royalBlue"
                    helperText={errors.user_district?.message}
                  />
                </div>

                <div className="grid gap-2 mb-6">
                  <Label htmlFor="user_ward">Phường/Xã</Label>
                  <SelectField
                    placeholder="Chọn phường/xã"
                    options={wards}
                    value={selectedWard}
                    onValueChange={handleWardChange}
                    disabled={!selectedDistrict}
                    triggerClassName="border-primary/20 focus:ring-1 focus:ring-primary-royalBlue"
                    helperText={errors.user_ward?.message}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-primary hover:bg-primary/10 hover:text-primary"
            >
              Hủy thay đổi
            </Button>
            <Button
              type="submit"
              className="bg-primary-royalBlue/10 hover:bg-primary-royalBlue/10 text-primary-royalBlue border-primary-royalBlue border"            
            >
              Lưu thay đổi
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
