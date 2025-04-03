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

export const signupSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: passwordValidation,
    name: nameValidation,
    phoneNumber: phoneValidation,
    address: z
      .string()
      .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
      .max(100, "Địa chỉ không được quá 100 ký tự"),
    province: z.string().min(1, "Vui lòng chọn tỉnh/thành"),
    district: z.string().min(1, "Vui lòng chọn quận/huyện"),
    ward: z.string().min(1, "Vui lòng chọn phường/xã"),
    role: z.string().min(1, "Vui lòng chọn vai trò"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu không khớp",
  });

export type LoginFormSchema = z.infer<typeof loginSchema>;
export type SignupFormSchema = z.infer<typeof signupSchema>;
