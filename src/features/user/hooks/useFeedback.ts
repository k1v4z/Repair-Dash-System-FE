import { useState } from "react";
import { feedbackService } from "../service/feedback.service";
import type { FeedbackPayload, FeedbackResponse } from "../types/feedback.type";

export function useFeedback() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<FeedbackResponse | null>(null);

  const submitFeedback = async (data: FeedbackPayload) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await feedbackService.createFeedback(data);
      setResponse(res);
      return res;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Gửi phản hồi thất bại");
      } else {
        setError("Gửi phản hồi thất bại");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitFeedback, loading, error, response };
}
