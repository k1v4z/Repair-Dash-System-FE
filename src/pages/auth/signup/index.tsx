import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectForm from "./components/selectForm";
import routePath from "@/config/route";

type Option = {
  value: string;
  label: string;
};

const SignUp = () => {
  const provinces: Option[] = [
    { value: "hanoi", label: "Hà Nội" },
    { value: "hochiminh", label: "Hồ Chí Minh" },
    { value: "danang", label: "Đà Nẵng" },
    { value: "cantho", label: "Cần Thơ" },
  ];

  const districtsByProvince: Record<string, Option[]> = {
    hanoi: [
      { value: "hoankiem", label: "Hoàn Kiếm" },
      { value: "badinh", label: "Ba Đình" },
      { value: "dongda", label: "Đống Đa" },
      { value: "caugiay", label: "Cầu Giấy" },
    ],
    hochiminh: [
      { value: "district1", label: "Quận 1" },
      { value: "district3", label: "Quận 3" },
      { value: "binhthanh", label: "Bình Thạnh" },
      { value: "phunhuan", label: "Phú Nhuận" },
    ],
    danang: [
      { value: "haichau", label: "Hải Châu" },
      { value: "sontra", label: "Sơn Trà" },
      { value: "thanhkhe", label: "Thanh Khê" },
    ],
    cantho: [
      { value: "ninhkieu", label: "Ninh Kiều" },
      { value: "binhthuy", label: "Bình Thủy" },
      { value: "cairang", label: "Cái Răng" },
    ],
  };

  const wardsByDistrict: Record<string, Option[]> = {
    hoankiem: [
      { value: "phuc_tan", label: "Phúc Tân" },
      { value: "dong_xuan", label: "Đồng Xuân" },
      { value: "hang_bac", label: "Hàng Bạc" },
    ],
    badinh: [
      { value: "cong_vi", label: "Cống Vị" },
      { value: "dien_bien", label: "Điện Biên" },
      { value: "kim_ma", label: "Kim Mã" },
    ],
    district1: [
      { value: "ben_nghe", label: "Bến Nghé" },
      { value: "ben_thanh", label: "Bến Thành" },
      { value: "pham_ngu_lao", label: "Phạm Ngũ Lão" },
    ],
    district3: [
      { value: "vo_thi_sau", label: "Võ Thị Sáu" },
      { value: "ward_10", label: "Phường 10" },
      { value: "ward_11", label: "Phường 11" },
    ],
  };

  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict(""); // Reset quận/huyện khi đổi tỉnh/thành
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
  };

  return (
    <div className="p-12">
      <h2 className="text-black text-3xl text-center font-bold">Đăng ký</h2>
      <SelectForm />
      <form className="mt-12 flex flex-col gap-7">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Email */}
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
              className="text-black px-4 py-3 rounded-lg border border-[primary-grayLight] bg-white shadow-md"
            />
          </div>

          {/* Password */}
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
              placeholder="*******"
              className="text-black px-4 py-3 rounded-lg border border-[primary-grayLight] bg-white shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Name */}
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
              className="text-black px-4 py-3 rounded-lg border border-[primary-grayLight] bg-white shadow-md"
            />
          </div>

          {/* Phone number */}
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
              className="text-black px-4 py-3 rounded-lg border border-[primary-grayLight] bg-white shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Address*/}
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
              className="text-black px-4 py-3 rounded-lg border border-[primary-grayLight] bg-white shadow-md"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* City */}
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="" className="text-black text-[16px] font-semibold">
              Tỉnh / Thành
            </label>
            <Select onValueChange={handleProvinceChange}>
              <SelectTrigger className="w-full h-[45.33px] rounded-lg border bg-white shadow-md focus:ring-0 ">
                <SelectValue placeholder="Chọn tỉnh / thành" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.value} value={province.value}>
                    {province.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* District   */}
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
                  districtsByProvince[selectedProvince]?.map((district) => (
                    <SelectItem key={district.value} value={district.value}>
                      {district.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ward */}
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
                  wardsByDistrict[selectedDistrict]?.map((ward) => (
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
