import { z } from "zod";

const NAME_REGEX = /^[\p{L} ]+$/u;
const PHONE_REGEX = /^\d+$/;

export const emailValidation = z
  .string()
  .min(1, "Email là bắt buộc")
  .email("Email không hợp lệ");

export const passwordValidation = (variants?: string) => {
  const base = z.string();

  if (variants === "signup") {
    return base
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(50, "Mật khẩu không được quá 50 ký tự");
  }

  return base.min(1, "Vui lòng nhập mật khẩu");
};

export const confirmPasswordValidation = z
  .string()
  .min(1, "Vui lòng nhập xác nhận mật khẩu");

export const phoneValidation = z
  .string()
  .min(1, "Số điện thoại là bắt buộc")
  .min(10, "Số điện thoại gồm 10-11 số")
  .max(11, "Số điện thoại gồm 10-11 số")
  .regex(PHONE_REGEX, "Số điện thoại chỉ được chứa số");

export const nameValidation = z
  .string()
  .min(1, "Họ và tên là bắt buộc")
  .min(4, "Họ và tên phải có ít nhất 4 ký tự")
  .max(500, "Họ và tên không được quá 500 ký tự")
  .regex(NAME_REGEX, "Họ và tên không hợp lệ");

export const addressValidation = z
  .string()
  .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
  .max(100, "Địa chỉ không được quá 100 ký tự");

export const phoneNumberValidation = z
  .string()
  .regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ");
