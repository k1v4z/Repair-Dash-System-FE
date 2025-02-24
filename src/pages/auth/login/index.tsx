import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      email,
      password,
    });
  };

  return (
    <div className="flex-1 p-12">
      <h2 className="text-white text-3xl text-center font-bold">Đăng nhập</h2>
      {/* form login */}
      <form className="mt-12 flex flex-col gap-7" onSubmit={handleSubmitLogin}>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-white text-[16px] font-semibold">
            Email
          </label>
          <Input
            type="text"
            placeholder="example@gmail.com"
            className="text-white px-4 py-3 rounded-lg border-none bg-[#2a2a36]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-white text-[16px] font-semibold">
            Mật khẩu
          </label>
          <Input
            type="password"
            placeholder="*******"
            className="text-white pl-4 pr-10 py-3 rounded-lg border-none bg-[#2a2a36]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          size="lg"
          className="bg-[#7c5cff] hover:bg-[#7c5cff]/80 mt-3 h-11"
        >
          Đăng nhập
        </Button>
      </form>

      <p className="text-center mt-4 text-white">
        Bạn chưa có tài khoản?{" "}
        <Link to="" className="underline">
          Đăng ký tại đây
        </Link>
      </p>
    </div>
  );
};

export default Login;
