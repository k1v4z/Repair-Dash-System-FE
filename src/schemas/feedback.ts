import { z } from "zod";

export const feedbackSchema = z.object({
  report_description: z.string().min(1, "Mô tả phản hồi không được để trống").max(100, "Mô tả phản hồi không được vượt quá 100 ký tự"),
  report_image: z.string().optional(),
});
export type FeedbackForm = z.infer<typeof feedbackSchema>;