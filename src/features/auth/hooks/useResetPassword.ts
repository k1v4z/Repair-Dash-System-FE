import { useState } from "react";
import { authApi } from "../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ResetPasswordState } from "../types/auth-store.type";

export const useResetPassword = () => {
  const [state, setState] = useState<ResetPasswordState>({
    loading: false,
    otpSent: false,
    otpVerified: false,
    success: false,
  });

  const sendOtp = async (email: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const response = await authApi.sendOtp(email);
      
      if (response && response.code === 1) {
        setState(prev => ({ ...prev, loading: false, otpSent: true }));
        toast.success("Mã xác thực đã được gửi đến email của bạn");
        return true;
      } else {
        setState(prev => ({ ...prev, loading: false }));
        toast.error("Không thể gửi mã xác thực. Vui lòng thử lại sau.");
        return false;
      }
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      
      if (error instanceof AxiosError) {
        if (error.response?.data?.message === "Email not found" || 
            error.response?.data?.code === -1) {
          toast.error("Email không tồn tại trong hệ thống");
        } else {
          toast.error("Không thể gửi mã xác thực. Vui lòng thử lại sau.");
        }
      } else {
        toast.error("Không thể gửi mã xác thực. Vui lòng thử lại sau.");
      }
      
      return false;
    }
  };

  // Xác thực OTP
  const verifyOtp = async (email: string, otp: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await authApi.verifyOtp(email, otp);
      setState(prev => ({ ...prev, loading: false, otpVerified: true }));
      toast.success("Xác thực mã OTP thành công");
      return true;
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Mã OTP không hợp lệ hoặc đã hết hạn");
      } else {
        toast.error("Mã OTP không hợp lệ hoặc đã hết hạn");
      }
      return false;
    }
  };

  // Đặt lại mật khẩu
  const resetPassword = async (email: string, new_password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await authApi.resetPassword(email, new_password);
      setState(prev => ({ 
        ...prev, 
        loading: false,
        success: true
      }));
      toast.success("Đổi mật khẩu thành công");
      return true;
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Không thể đổi mật khẩu. Vui lòng thử lại sau.");
      } else {
        toast.error("Không thể đổi mật khẩu. Vui lòng thử lại sau.");
      }
      return false;
    }
  };

  return {
    ...state,
    sendOtp,
    verifyOtp,
    resetPassword
  };
}; 