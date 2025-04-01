import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectField from "@/components/common/select-field";
import RoleSelect from "../signup/_components/role-select";
import routePath from "@/config/route";
import { useSelectLocation } from "@/hooks/useSelectLocation";
import { signupSchema, type SignupFormSchema } from "@/schemas/auth";
import { authService } from "@/features/auth/services/auth.service";
import type { RegisterInput } from "@/features/auth/types/auth-store.type";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "customer",
      province: "",
      district: "",
      ward: "",
    },
  });

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

  const handleProvinceChange = (value: string) => {
    provinceChangeHandler(value);
    setValue("province", value, { shouldValidate: true });
  };

  const handleDistrictChange = (value: string) => {
    districtChangeHandler(value);
    setValue("district", value, { shouldValidate: true });
  };

  const handleWardChange = (value: string) => {
    wardChangeHandler(value);
    setValue("ward", value, { shouldValidate: true });
  };

  const onChangeRole = (role: string) => {
    setValue("role", role);
  };

  const onSubmit = async (data: SignupFormSchema) => {
    setError(null);
    try {
      const registerData: RegisterInput = {
        identifier_email: data.email,
        password: data.password,
        role: data.role.toUpperCase() as "STORE" | "CUSTOMER",
        user_full_name: data.name,
        user_phone_number: data.phoneNumber,
        user_street: data.address,
        user_ward: data.ward,
        user_district: data.district,
        user_city: data.province,
      };

      const response = await authService.register(registerData);
      if (response.status === 201) {
        navigate(routePath.login);
      }
    } catch {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="p-12">
      <h2 className="text-black text-3xl text-center font-bold">Đăng ký</h2>
      <RoleSelect onChangeRole={onChangeRole} />
      <form
        className="mt-12 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="email"
              className="text-black text-[16px] font-semibold"
            >
              Email
            </label>
            <div>
              <Input
                type="text"
                placeholder="example@gmail.com"
                className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
                {...register("email")}
                helperText={errors.email?.message}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="password"
              className="text-black text-[16px] font-semibold"
            >
              Mật khẩu
            </label>
            <div>
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
                {...register("password")}
                helperText={errors.password?.message}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="name"
              className="text-black text-[16px] font-semibold"
            >
              Họ và tên
            </label>
            <div>
              <Input
                type="text"
                placeholder="Nguyễn Văn A"
                className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
                {...register("name")}
                helperText={errors.name?.message}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="phoneNumber"
              className="text-black text-[16px] font-semibold"
            >
              Số điện thoại
            </label>
            <div>
              <Input
                type="text"
                placeholder="0904217812"
                className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
                {...register("phoneNumber")}
                helperText={errors.phoneNumber?.message}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="address"
              className="text-black text-[16px] font-semibold"
            >
              Địa chỉ
            </label>
            <div>
              <Input
                type="text"
                placeholder="Số nhà, tên đường"
                className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
                {...register("address")}
                helperText={errors.address?.message}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="" className="text-black text-[16px] font-semibold">
              Tỉnh / Thành
            </label>
            <div>
              <SelectField
                placeholder="Chọn tỉnh / thành"
                value={selectedProvince}
                onValueChange={handleProvinceChange}
                options={provinces}
                helperText={errors.province?.message}
                {...register("province")}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="" className="text-black text-[16px] font-semibold">
              Quận / Huyện
            </label>
            <div>
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
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="" className="text-black text-[16px] font-semibold">
              Phường / Xã
            </label>
            <div>
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
        <Button
          size="lg"
          type="submit"
          className="bg-primary-royalBlue hover:bg-primary-royalBlue/80 mt-3 h-11"
        >
          Đăng ký
        </Button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <p className="text-center mt-4 text-primary-royalBlue">
        Bạn đã có tài khoản?{" "}
        <Link
          to={routePath.login}
          className="underline hover:text-primary-goldenTainoi"
        >
          Đăng nhập tại đây
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
