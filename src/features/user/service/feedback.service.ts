import { feedbackApi } from "../api";
import type { FeedbackPayload, FeedbackResponse } from "../types/feedback.type";

export const feedbackService = {
  createFeedback: async (data: FeedbackPayload): Promise<FeedbackResponse> => {
    return await feedbackApi.createFeedback(data);
  },
};