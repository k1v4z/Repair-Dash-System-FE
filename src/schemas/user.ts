import { z } from "zod";
import { addressValidation, phoneValidation, nameValidation } from "./helper";

export const updateUserSchema = z.object({
  name: nameValidation,
  phoneNumber: phoneValidation,
  role: z.string().min(1, "Vui lòng chọn vai trò"),
  address: addressValidation,
  user_city: z.string().min(1, "Vui lòng chọn tỉnh/thành"),
  user_district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  user_ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  user_priority: z.string().min(1, "Vui lòng chọn gói đăng ký"),
  password: z.string().optional(),
});

export type UpdateUserFormSchema = z.infer<typeof updateUserSchema>;
