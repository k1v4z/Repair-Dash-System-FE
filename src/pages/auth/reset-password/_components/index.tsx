import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { useNavigate } from "react-router-dom";
import { OtpInput } from "@/components/ui/otp-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordFormSchema } from "@/schemas/auth";
import { useCountdown } from "@/hooks/useCountdown";

const FadeTransition = ({ children, step }: { children: React.ReactNode; step: number }) => (
  <div
    key={step}
    className="transition-opacity duration-300 ease-in-out opacity-100 animate-fadeIn"
    style={{ animation: "fadeIn 0.4s" }}
  >
    {children}
    <style>
      {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}
    </style>
  </div>
);

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  
  const {
    timeLeft,
    isExpired,
    formattedTime,
    startCountdown,
  } = useCountdown({
    initialTime: 300, // 5 minutes
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  const { loading, sendOtp, verifyOtp, resetPassword } = useResetPassword();

  const handleSendOtp = async () => {
    const emailValue = getValues("email");
    if (!emailValue) {
      setError("Vui lòng nhập email");
      return;
    }
    
    setEmail(emailValue);
    const success = await sendOtp(emailValue);
    if (success) {
      startCountdown();
      setStep(2);
      setError("");
      setOtp("");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError("Vui lòng nhập đủ 6 chữ số mã OTP");
      return;
    }
    
    const success = await verifyOtp(email, otp);
    if (success) {
      setStep(3);
      setError("");
    }
  };

  const onSubmit = async (data: ResetPasswordFormSchema) => {
    const success = await resetPassword(email, data.newPassword);
    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf2fb]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Quên mật khẩu</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <FadeTransition step={step}>
              <label className="block mb-2 font-medium text-black">Nhập email của bạn</label>
              <Input
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
                className="mb-2"
                helperText={errors.email?.message}
              />
              <Button
                type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg transition mt-4"
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Gửi mã xác nhận"}
              </Button>
            </FadeTransition>
          )}

          {step === 2 && (
            <FadeTransition step={step}>
              <div className="text-center">
                <label className="block mb-3 font-medium text-black">
                  Nhập mã xác nhận (OTP) đã gửi tới email
                </label>
                <p className="mb-2 text-sm text-gray-600">
                  Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến {email}
                </p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <p className="text-sm text-gray-600">
                    Mã OTP sẽ hết hạn sau: 
                  </p>
                  <span className={`font-medium ${timeLeft <= 60 ? 'text-red-500' : 'text-blue-600'}`}>
                    {formattedTime}
                  </span>
                </div>
                
                <OtpInput 
                  value={otp} 
                  onChange={setOtp} 
                  disabled={loading || isExpired}
                />
                
                <Button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg transition mt-4"
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length !== 6 || isExpired}
                >
                  {loading ? "Đang xác thực..." : "Xác nhận"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full mt-4 text-primary-royalBlue"
                  onClick={() => setStep(1)}
                  disabled={loading}
                >
                  Quay lại
                </Button>
              </div>
            </FadeTransition>
          )}

          {step === 3 && (
            <FadeTransition step={step}>
              <label className="block mb-2 font-medium text-black">Mật khẩu mới</label>
              <Input
                type="password"
                placeholder="Nhập mật khẩu mới"
                {...register("newPassword")}
                className="mb-10"
                helperText={errors.newPassword?.message}
              />
              <label className="block mb-2 font-medium text-black">Xác nhận mật khẩu mới</label>
              <Input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                {...register("confirmPassword")}
                className="mb-5"
                helperText={errors.confirmPassword?.message}
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg transition mt-4"
                disabled={loading}
              >
                {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full mt-2 text-primary-royalBlue"
                onClick={() => setStep(2)}
                disabled={loading}
              >
                Quay lại
              </Button>
            </FadeTransition>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
