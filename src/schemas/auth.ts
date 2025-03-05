import { z } from "zod";
import {
  emailValidation,
  passwordValidation,
  phoneValidation,
  nameValidation,
} from "./helper";

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signupSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  name: nameValidation,
  phoneNumber: phoneValidation,
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
  province: z.string().min(1, "Vui lòng chọn tỉnh/thành"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  role: z.string().min(1, "Vui lòng chọn vai trò"),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;
export type SignupFormSchema = z.infer<typeof signupSchema>;
