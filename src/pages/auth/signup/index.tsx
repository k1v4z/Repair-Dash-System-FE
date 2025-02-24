import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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
    <div className="flex-1 p-12">
      <h2 className="text-white text-3xl text-center font-bold">Đăng ký</h2>

      <form className="mt-12 flex flex-col gap-7" onSubmit={handleSubmitLogin}>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-white text-[16px] font-semibold"
          >
            Email
          </label>
          <Input
            type="text"
            name="email"
            placeholder="example@gmail.com"
            className="text-white px-4 py-3 rounded-lg border-none bg-primary-steelCharcoal"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-white text-[16px] font-semibold"
          >
            Họ và tên
          </label>
          <Input
            type="text"
            name="name"
            placeholder="Nguyễn Văn A"
            className="text-white px-4 py-3 rounded-lg border-none bg-primary-steelCharcoal"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Phone number */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="phoneNumber"
            className="text-white text-[16px] font-semibold"
          >
            Số điện thoại
          </label>
          <Input
            type="text"
            name="phoneNumber"
            placeholder="0904217812"
            className="text-white px-4 py-3 rounded-lg border-none bg-primary-steelCharcoal"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-white text-[16px] font-semibold"
          >
            Mật khẩu
          </label>
          <Input
            type="password"
            name="password"
            placeholder="*******"
            className="text-white pl-4 pr-10 py-3 rounded-lg border-none bg-primary-steelCharcoal"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <Button
          size="lg"
          className="bg-primary-electricViolet hover:bg-primary-electricViolet/80 mt-3 h-11"
        >
          Đăng ký
        </Button>
      </form>

      <p className="text-center mt-4 text-white">
        Bạn đã có tài khoản?{" "}
        <Link to={routePath.login} className="underline">
          Đăng nhập tại đây
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
