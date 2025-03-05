import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import routePath from "@/config/route";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { loginSchema, type LoginFormSchema } from "@/schemas/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isLoading, error, clearError } = useAuth();

  const onSubmit = async (data: LoginFormSchema) => {
    clearError();
    await login(data.email, data.password);
  };

  return (
    <div className="p-12">
      <h2 className="text-black text-3xl text-center font-bold">Đăng nhập</h2>
      <form
        className="mt-12 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-black text-[16px] font-semibold">
            Email
          </label>
          <div>
            <Input
              type="text"
              placeholder="example@gmail.com"
              className="text-black px-4 py-3 rounded-lg border border-[primary-grayLight] bg-white shadow-md"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-black text-[16px] font-semibold">
            Mật khẩu
          </label>
          <div>
            <Input
              type="password"
              placeholder="Nhập mật khẩu"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
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
          to={routePath.signup}
          className="underline hover:text-primary-goldenTainoi"
        >
          Đăng ký tại đây
        </Link>
      </p>
    </div>
  );
};

export default Login;
