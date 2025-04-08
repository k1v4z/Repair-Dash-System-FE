import { z } from "zod";

const NAME_REGEX = /^[\p{L} ]+$/u;
const PHONE_REGEX = /^[0-9]{10}$/;

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
  .regex(PHONE_REGEX, "Số điện thoại không hợp lệ");

export const nameValidation = z
  .string()
  .min(1, "Họ và tên là bắt buộc")
  .min(5, "Họ và tên phải có ít nhất 5 ký tự")
  .max(500, "Họ và tên không được quá 500 ký tự")
  .regex(NAME_REGEX, "Họ và tên không hợp lệ");

export const phoneNumberValidation = z
  .string()
  .regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ");

