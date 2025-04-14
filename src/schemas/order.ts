import { z } from "zod";
import { addressValidation, phoneValidation } from "./helper";

export const orderFormSchema = z.object({
  customer_full_name: z.string().min(1, "Vui lòng nhập tên"),
  customer_phone_number: phoneValidation,
  user_street: addressValidation,
  user_city: z.string().min(1, "Vui lòng chọn thành phố"),
  user_district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  user_ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  order_description: z.string().optional(),
  order_images: z
    .array(
      z.union([
        z.instanceof(File),
        z
          .string()
          .regex(
            /^data:image\/[a-zA-Z]+;base64,/,
            "Invalid base64 image format"
          ),
      ])
    )
    .optional(),
  service_id: z.number().optional(),
});

export const orderUpdateSchema = z.object({
  customer_full_name: z.string().min(1, "Vui lòng nhập tên").optional(),
  customer_phone_number: phoneValidation.optional(),
  customer_address: addressValidation.optional(),
  order_description: z.string().optional(),
  order_status: z
    .enum(["PENDING", "PROCESSING", "CANCELED", "COMPLETED"])
    .optional(),
  order_feedback: z.string().optional(),
  order_images: z
    .array(
      z.union([
        z.instanceof(File),
        z
          .string()
          .regex(
            /^data:image\/[a-zA-Z]+;base64,/,
            "Invalid base64 image format"
          ),
      ])
    )
    .optional(),
  order_rating: z.number().min(1).max(5).optional(),
});

export const storeUpdateOrderSchema = z
  .object({
    order_status: z.enum(["PROCESSING", "CANCELED", "COMPLETED"]),
    employee_id: z.number().min(1, "Vui lòng chọn nhân viên").optional(),
    order_description: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.order_status === "PROCESSING") {
        return !!data.employee_id;
      }
      return true;
    },
    {
      message: "Vui lòng chọn nhân viên",
      path: ["employee_id"],
    }
  )
  .refine(
    (data) => {
      if (data.order_status === "CANCELED") {
        return !!data.order_description;
      }
      return true;
    },
    {
      message: "Vui lòng nhập lý do hủy đơn",
      path: ["order_description"],
    }
  );

export type OrderFormData = z.infer<typeof orderFormSchema>;
export type OrderUpdateData = z.infer<typeof orderUpdateSchema>;
export type StoreOrderUpdateData = z.infer<typeof storeUpdateOrderSchema>;
