export type FeedbackPayload = {
  report_description: string;
  report_images: string;
};

export type FeedbackResponse = {
  message: string;
  result: {
    id: number;
  };
};
export type FeedbackForm ={
  report_description: string;
  report_image?: string;
}

export type FeedbackBubble = {
  isHidden?: boolean;
}