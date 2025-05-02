import { useState } from "react";
import { useForm } from "react-hook-form";
import Icon from "../icons";
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import TextareaField from "./textarea-field";
import { ImageUpload } from "@/components/ui/image-upload";
import { useFeedback } from "@/features/user/hooks/useFeedback";
import { convertToBase64 } from "@/utils/convert/base64";
import { toast } from "react-toastify"; 
import type { FeedbackForm , FeedbackBubble } from "@/features/user/types/feedback.type";
import { feedbackSchema } from "@/schemas/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
const FeedbackBubble = ({ isHidden }: FeedbackBubble) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      report_description: "",
      report_image: undefined,
    },
  });
  const { submitFeedback, loading } = useFeedback();

  if (isHidden) return null;

  // Reset state when modal closes
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset();
    }
  };

  // Hàm chuyển file sang base64 và set vào form
  const handleImageChange = async (file: File | undefined) => {
    if (file) {
      const base64 = await convertToBase64(file);
      setValue("report_image", base64);
    } else {
      setValue("report_image", undefined);
    }
  };

  const onSubmit = async (data: FeedbackForm) => {
    try {
      await submitFeedback({
        report_description: data.report_description,
        report_images: data.report_image ?? "",
      });
      toast.success("Gửi phản hồi thành công!");
      reset();
      setOpen(false);
    } catch {
      toast.error("Gửi phản hồi thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="fixed bottom-[100px] w-max h-max right-6 z-30">
      <Modal open={open} onOpenChange={handleOpenChange}>
        <ModalTrigger asChild>
          <button
            className="flex items-center justify-center rounded-full bg-primary-royalBlue text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 h-[60px] w-[60px] hover:bg-primary-royalBlue/90 transition-all duration-200"
            aria-label="Gửi phản hồi"
            style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.12)" }}
          >
            <Icon glyph="feedback" className="w-[36px] h-[36px] text-white" />
          </button>
        </ModalTrigger>
        <ModalContent className="max-w-2xl max-h-[985px] overflow-y-auto w-full rounded-3xl p-0 border-0 shadow-2xl bg-white">
          <ModalHeader className="px-10 pt-8 pb-2">
            <ModalTitle className="text-2xl font-bold text-gray-900">Góp ý & Phản hồi hệ thống</ModalTitle>
            <ModalDescription className="text-gray-500 text-base mt-1">
              Chúng tôi luôn lắng nghe ý kiến của bạn để cải thiện dịch vụ!
            </ModalDescription>
          </ModalHeader>
          <form className="space-y-7 px-10 pb-10 pt-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 overflow-hidden">
              <label htmlFor="report-description" className="block mb-2 font-semibold text-gray-800">
                Nội dung góp ý <span className="text-red-500">*</span>
              </label>
              <TextareaField
                id="report-description"
                placeholder="Nhập góp ý, phản hồi hoặc ý kiến của bạn..."
                {...register("report_description")}
                className="resize-none min-h-[120px] text-base rounded-xl border-gray-200 focus:border-primary-royalBlue focus:ring-2 focus:ring-primary-royalBlue/30 bg-white"
                helperText={errors.report_description?.message}
              />
            </div>
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 overflow-hidden">
              <label className="block mb-2 font-semibold text-gray-800">Hình ảnh mô tả <span className="text-gray-400">(1 ảnh)</span></label>
              <ImageUpload
                onImageChange={handleImageChange}
                className="w-full"
              />
            </div>
            <ModalFooter className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl text-base font-semibold bg-gradient-to-r from-blue-500 to-primary-royalBlue hover:from-blue-600 hover:to-primary-royalBlue/90 transition-all duration-200 shadow-lg"
              >
                {loading ? "Đang gửi..." : "Gửi phản hồi"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      </div>
  );
};

export default FeedbackBubble;
