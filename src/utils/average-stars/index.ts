import { Feedback } from "@/features/store/types/store-manage.type";

export const averageStars = (feedbacks: Feedback[]) => {
  const totalStars = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
  return totalStars / feedbacks.length;
};
