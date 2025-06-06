import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import TextareaField from "@/components/common/textarea-field";
import SelectField from "@/components/common/select-field";
import { useSelectLocation } from "@/hooks/useSelectLocation";
import { UseFormReturn } from "react-hook-form";
import FileUpload from "@/components/common/upload-file";

import type { OrderFormData } from "@/schemas/order";
import type { UserAddress } from "@/types/service";

interface CustomerInformationProps {
  customer: UserAddress;
  form: UseFormReturn<OrderFormData>;
}

export default function CustomerInformationSection({
  customer,
  form,
}: CustomerInformationProps) {
  const {
    selectedProvince,
    selectedDistrict,
    provinces,
    districts,
    wards,
    handleProvinceChange: provinceChangeHandler,
    handleDistrictChange: districtChangeHandler,
    handleWardChange: wardChangeHandler,
  } = useSelectLocation({
    initialProvince: customer.user_city,
    initialDistrict: customer.user_district,
    initialWard: customer.user_ward,
  });

  const {
    register,
    setValue,
    formState: { errors },
  } = form;

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

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-blue-700 text-left">
        Thông tin khách hàng
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="customer_full_name"
              className="text-left w-full block"
            >
              Họ tên
            </Label>
            <Input
              id="customer_full_name"
              {...register("customer_full_name")}
              defaultValue={customer.user_full_name}
              disabled
              placeholder="Enter your name"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
              helperText={errors.customer_full_name?.message}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="customer_phone_number"
              className="text-left w-full block"
            >
              Số điện thoại
            </Label>
            <Input
              id="customer_phone_number"
              {...register("customer_phone_number")}
              defaultValue={customer.user_phone_number}
              placeholder="Enter your phone number"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
              helperText={errors.customer_phone_number?.message}
            />
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <Label htmlFor="user_street" className="text-left w-full block">
            Số nhà / Đường
          </Label>
          <Input
            id="user_street"
            {...register("user_street")}
            defaultValue={customer.user_street}
            placeholder="Enter your address"
            className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
            helperText={errors.user_street?.message}
          />
        </div>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="province" className="text-left w-full block">
              Tỉnh / Thành phố
            </Label>
            <SelectField
              placeholder="Chọn tỉnh thành"
              defaultValue={customer.user_city}
              onValueChange={(value) => {
                handleProvinceChange(value);
                setValue("user_city", value);
              }}
              options={provinces}
              helperText={errors.user_city?.message}
              {...register("user_city")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="district" className="text-left w-full block">
              Quận / Huyện
            </Label>
            <SelectField
              placeholder="Chọn quận huyện"
              disabled={!selectedProvince}
              defaultValue={customer.user_district}
              onValueChange={(value) => {
                handleDistrictChange(value);
                setValue("user_district", value);
              }}
              options={districts}
              helperText={errors.user_district?.message}
              {...register("user_district")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ward" className="text-left w-full block">
              Xã / Phường
            </Label>
            <SelectField
              placeholder="Chọn phường xã"
              disabled={!selectedDistrict}
              defaultValue={customer.user_ward}
              onValueChange={(value) => {
                handleWardChange(value);
                setValue("user_ward", value);
              }}
              options={wards}
              {...register("user_ward")}
              helperText={errors.user_ward?.message}
            />
          </div>
        </div>
        <FileUpload
          multiple
          acceptedFileTypes={["image/png", "image/jpeg"]}
          maxFiles={5}
          buttonText="Tải lên"
          buttonVariant="default"
          onFilesSelected={(files) => {
            setValue("order_images", files);
          }}
        />
        <div className="space-y-2">
          <Label htmlFor="order_description" className="text-left w-full block">
            Mô tả chi tiết
          </Label>
          <TextareaField
            id="order_description"
            {...register("order_description")}
            placeholder="Mô tả chi tiết về hư hỏng thiết bị của bạn và yêu cầu sửa chữa"
            className="h-32 resize-none"
          />
        </div>
      </div>
    </Card>
  );
}
