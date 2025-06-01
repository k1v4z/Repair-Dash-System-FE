import { z } from "zod";

const baseProfileSchema = {
  user_full_name: z
    .string()
    .min(4, "Họ tên phải có ít nhất 4 ký tự")
    .max(50, "Họ tên không được vượt quá 200 ký tự")
    .regex(/^[a-zA-ZÀ-ỹẠ-ỹ\s]+$/, "Họ tên không hợp lệ"),
  user_phone_number: z
    .string()
    .regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  user_street: z
    .string()
    .min(1, "Vui lòng nhập địa chỉ")
    .max(100, "Địa chỉ không được vượt quá 100 ký tự"),
  user_ward: z
    .string()
    .min(1, "Vui lòng chọn phường/xã"),
  user_district: z
    .string()
    .min(1, "Vui lòng chọn quận/huyện"),
  user_city: z
    .string()
    .min(1, "Vui lòng chọn thành phố"),
};

export const userProfileSchema = z.object({
  ...baseProfileSchema,
});

export const storeProfileSchema = z.object({
  ...baseProfileSchema,
  user_description: z
    .string()
    .min(6, "Mô tả phải có ít nhất 6 ký tự")
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .transform(val => val.trim() === "" ? undefined : val)
    .optional(),
});

export type UserProfileFormData = z.infer<typeof userProfileSchema>;
export type StoreProfileFormData = z.infer<typeof storeProfileSchema>; 