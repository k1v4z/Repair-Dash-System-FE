import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/icons";
import { feedbackSchema, type FeedbackFormData } from "@/schemas/order";

interface FeedbackOrderProps {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;
  onFeedbackSubmit: (data: FeedbackFormData) => Promise<void>;
}

export default function FeedbackOrder({ isOpen, onFeedbackSubmit, onClose }: FeedbackOrderProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      content: "",
    },
  });

  const handleStarHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const onSubmit = async (data: FeedbackFormData) => {
    await onFeedbackSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="max-w-lg w-full mx-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Đánh giá dịch vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label>Đánh giá của bạn</Label>
                <div 
                  className="flex items-center justify-center gap-2" 
                  onMouseLeave={handleStarLeave}
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className="p-1 hover:scale-110 transition-transform"
                      onMouseEnter={() => handleStarHover(rating)}
                      onClick={() => handleStarClick(rating)}
                    >
                      <Icon 
                        glyph="star" 
                        className={`w-8 h-8 ${
                          (hoveredRating || selectedRating) >= rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && (
                  <p className="text-sm text-destructive">{errors.rating.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Nội dung đánh giá</Label>
                <Textarea
                  id="content"
                  placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ này..."
                  className="min-h-[120px]"
                  {...register("content")}
                />
                {errors.content && (
                  <p className="text-sm text-destructive">{errors.content.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-royalBlue hover:bg-primary-royalBlue/90"
                >
                  Gửi đánh giá
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
