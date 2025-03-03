import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import routePath from "@/config/route";

import { useAuth } from "@/features/auth/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, clearError } = useAuth();

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    await login(email, password);
  };

  return (
    <div className="p-12">
      <h2 className="text-black text-3xl text-center font-bold">Đăng nhập</h2>
      {/* form login */}
      <form className="mt-12 flex flex-col gap-7" onSubmit={handleSubmitLogin}>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-black text-[16px] font-semibold">
            Email
          </label>
          <Input
            type="text"
            placeholder="example@gmail.com"
            className="text-black px-4 py-3 rounded-lg border border-[primary-grayLight] bg-white shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-black text-[16px] font-semibold">
            Mật khẩu
          </label>
          <Input
            type="password"
            placeholder="Nhập mật khẩu"
            className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-500/15 p-3 text-sm text-red-500">
            Email hoặc mật khẩu không đúng. Vui lòng thử lại!
          </div>
        )}

        <Button
          size="lg"
          className="bg-primary-electricViolet hover:bg-primary-electricViolet/80 mt-3 h-11"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>

      <p className="text-center mt-4 text-primary-royalBlue">
        Bạn chưa có tài khoản?{" "}
        <Link
          to={routePath.signup.replace(":role", "customer")}
          className="underline hover:text-primary-goldenTainoi"
        >
          Đăng ký tại đây
        </Link>
      </p>
    </div>
  );
};

export default Login;
