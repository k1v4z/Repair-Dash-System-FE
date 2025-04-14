import { z } from "zod";
import {
  emailValidation,
  passwordValidation,
  phoneValidation,
  nameValidation,
  confirmPasswordValidation,
  addressValidation,
} from "./helper";

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation(),
});

export const signupSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation("signup"),
    confirmPassword: confirmPasswordValidation,
    name: nameValidation,
    phoneNumber: phoneValidation,
    address: addressValidation,
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
