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

import routePath from "@/config/route";

type Form = {
  email: string;
  name: string;
  phoneNumber: string;
  password: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<Form>({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-12">
      <h2 className="text-black text-3xl text-center font-bold">Đăng ký</h2>

      <form className="mt-12 flex flex-col gap-7" onSubmit={handleSubmitLogin}>
        <div className="flex gap-4 items-center ">
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>

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
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
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
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="" className="text-black text-[16px] font-semibold">
              Đối tượng
            </label>
            <Select>
              <SelectTrigger className="w-full h-[45.33px] rounded-lg border bg-white shadow-md focus:ring-0 ">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Cửa hàng</SelectItem>
                <SelectItem value="dark">Khách hàng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 items-center">
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
              placeholder="Sơn Trà, Đà Nẵng"
              className="text-black px-4 py-3 rounded-lg border border-[primary-grayLight] bg-white shadow-md"
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
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
