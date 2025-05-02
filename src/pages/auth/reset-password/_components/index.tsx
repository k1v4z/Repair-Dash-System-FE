import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  // State cho từng bước
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eaf2fb]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Quên mật khẩu</h2>

        {step === 1 && (
          <FadeTransition step={step}>
            <label className="block mb-2 font-medium text-black">Nhập email của bạn</label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mb-5"
            />
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg transition"
              onClick={() => setStep(2)}
            >
              Gửi mã xác nhận
            </Button>
          </FadeTransition>
        )}

        {step === 2 && (
          <FadeTransition step={step}>
            <label className="block mb-2 font-medium text-black">
              Nhập mã xác nhận (OTP) đã gửi tới email
            </label>
            <Input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}
              maxLength={6}
              onChange={e => setOtp(e.target.value)}
              className="mb-5"
            />
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg transition"
              onClick={() => setStep(3)}
            >
              Xác nhận OTP
            </Button>
            <Button
              variant="ghost"
              className="w-full mt-2 text-primary-royalBlue"
              onClick={() => setStep(1)}
            >
              Quay lại
            </Button>
          </FadeTransition>
        )}

        {step === 3 && (
          <FadeTransition step={step}>
            <label className="block mb-2 font-medium text-black">Mật khẩu mới</label>
            <Input
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="mb-3"
            />
            <label className="block mb-2 font-medium text-black">Xác nhận mật khẩu mới</label>
            <Input
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="mb-5"
            />
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-lg transition"
            >
              Đổi mật khẩu
            </Button>
            <Button
              variant="ghost"
              className="w-full mt-2 text-primary-royalBlue"
              onClick={() => setStep(2)}
            >
              Quay lại
            </Button>
          </FadeTransition>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
