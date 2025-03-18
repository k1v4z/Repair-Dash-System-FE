import { z } from "zod";

export const serviceSchema = z.object({
  service_name: z.string()
    .min(6, "Tên dịch vụ phải có ít nhất 6 ký tự")
    .max(50, "Tên dịch vụ không được vượt quá 50 ký tự"),
  service_description: z.string()
    .min(10, "Mô tả phải có ít nhất 10 ký tự")
    .max(255, "Mô tả không được vượt quá 255 ký tự")
});

export type ServiceFormData = z.infer<typeof serviceSchema>; 