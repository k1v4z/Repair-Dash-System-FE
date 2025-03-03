import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RoleSelect from "@/features/auth/components/role-select";
import routePath from "@/config/route";
import {
  PROVINCES,
  DISTRICT_BY_PROVINCES,
  WARDS_BY_DISTRICT,
} from "@/constants/vi-locations";
import type { Option } from "@/types/globals.type";

const SignUp = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict(""); // Reset quận/huyện khi đổi tỉnh/thành
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
  };

  const onChangeRole = (role: string) => {
    console.log(role);
  };

  return (
    <div className="p-12">
      <h2 className="text-black text-3xl text-center font-bold">Đăng ký</h2>
      <RoleSelect onChangeRole={onChangeRole} />
      <form className="mt-12 flex flex-col gap-7">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="email"
              className="text-black text-[16px] font-semibold"
            >
              Email
            </label>
            <Input
              type="text"
              name="email"
              placeholder="example@gmail.com"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="password"
              className="text-black text-[16px] font-semibold"
            >
              Mật khẩu
            </label>
            <Input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
            />
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
            <Input
              type="text"
              name="name"
              placeholder="Nguyễn Văn A"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label
              htmlFor="phoneNumber"
              className="text-black text-[16px] font-semibold"
            >
              Số điện thoại
            </label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="0904217812"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
            />
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
            <Input
              type="text"
              name="address"
              placeholder="Số nhà, tên đường"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="" className="text-black text-[16px] font-semibold">
              Tỉnh / Thành
            </label>
            <Select onValueChange={handleProvinceChange}>
              <SelectTrigger className="w-full h-[45.33px] rounded-lg border bg-white shadow-md focus:ring-0 ">
                <SelectValue placeholder="Chọn tỉnh / thành" />
              </SelectTrigger>
              <SelectContent>
                {PROVINCES.map((province: Option) => (
                  <SelectItem key={province.value} value={province.value}>
                    {province.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="" className="text-black text-[16px] font-semibold">
              Quận / Huyện
            </label>
            <Select
              disabled={!selectedProvince}
              onValueChange={handleDistrictChange}
            >
              <SelectTrigger className="w-full h-[45.33px] rounded-lg border bg-white shadow-md focus:ring-0 ">
                <SelectValue placeholder="Chọn quận / huyện" />
              </SelectTrigger>
              <SelectContent>
                {selectedProvince &&
                  DISTRICT_BY_PROVINCES[selectedProvince]?.map(
                    (district: Option) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    )
                  )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="" className="text-black text-[16px] font-semibold">
              Phường / Xã
            </label>
            <Select disabled={!selectedDistrict}>
              <SelectTrigger className="w-full h-[45.33px] rounded-lg border bg-white shadow-md focus:ring-0 ">
                <SelectValue placeholder="Chọn phường / xã" />
              </SelectTrigger>
              <SelectContent>
                {selectedDistrict &&
                  WARDS_BY_DISTRICT[selectedDistrict]?.map((ward: Option) => (
                    <SelectItem key={ward.value} value={ward.value}>
                      {ward.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          size="lg"
          className="bg-primary-royalBlue hover:bg-primary-royalBlue/80 mt-3 h-11"
        >
          Đăng ký
        </Button>
      </form>

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
