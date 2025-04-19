import { z } from "zod";

export const profileSchema = z.object({
  user_full_name: z
    .string()
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được vượt quá 50 ký tự"),
  user_phone_number: z
    .string()
    .regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  user_description: z
    .string()
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .transform(val => val.trim() === "" ? undefined : val)
    .optional(),
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
});

export type ProfileFormData = z.infer<typeof profileSchema>; 