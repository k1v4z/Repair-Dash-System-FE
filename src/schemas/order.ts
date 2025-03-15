import { z } from "zod";
import { nameValidation, phoneValidation } from "./helper";

export const orderFormSchema = z.object({
  customer_full_name: nameValidation,
  customer_phone_number: phoneValidation,
  user_street: z.string().min(1, "Địa chỉ là bắt buộc"),
  user_city: z.string().min(1, "Tỉnh/Thành phố là bắt buộc"),
  user_district: z.string().min(1, "Quận/Huyện là bắt buộc"),
  user_ward: z.string().min(1, "Phường/Xã là bắt buộc"),
  order_description: z.string().optional(),
  //images: z.array(z.string()).min(1, "Cần ít nhất 1 hình ảnh"),

  service_id: z.number(),
});

export type OrderFormData = z.infer<typeof orderFormSchema>;
