import { z } from "zod";

export const emailValidation = z
  .string()
  .min(1, "Email là bắt buộc")
  .email("Email không hợp lệ");

export const passwordValidation = z
  .string()
  .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
  .max(50, "Mật khẩu không được quá 50 ký tự");

export const phoneValidation = z
  .string()
  .min(1, "Số điện thoại là bắt buộc")
  .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
  .min(10, "Số điện thoại phải có ít nhất 10 số")
  .max(11, "Số điện thoại không được quá 11 số");

export const nameValidation = z
  .string()
  .min(1, "Họ và tên là bắt buộc")
  .min(2, "Họ và tên phải có ít nhất 2 ký tự")
  .max(50, "Họ và tên không được quá 50 ký tự");
export const phoneNumberValidation = z
  .string()
  .regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ");
  