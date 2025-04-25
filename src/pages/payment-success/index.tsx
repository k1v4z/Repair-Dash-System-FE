import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icons";
import { zalopayApi } from "@/features/subscriptions/api/zalopay-api";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PaymentSuccessPage = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extract apptransid from URL query params
        const queryParams = new URLSearchParams(location.search);
        const apptransid = queryParams.get("apptransid");

        if (!apptransid) {
          setError("Không tìm thấy thông tin giao dịch");
          setIsVerifying(false);
          return;
        }

        // Verify payment with ZaloPay
        const response = await zalopayApi.verifyPayment(apptransid);

        // Check if the payment was successful
        if (response.code === 1 && response.return_code === 1) {
          setIsVerified(true);
        } else {
          setError(response.return_message || "Không thể xác thực giao dịch");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setError("Đã xảy ra lỗi khi xác thực giao dịch");
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8 text-center">
          {isVerifying ? (
            <div className="flex flex-col items-center">
              <Icon
                glyph="loader"
                className="w-16 h-16 text-primary animate-spin mb-4"
              />
              <h1 className="text-2xl font-bold mb-2">
                Đang xác thực thanh toán
              </h1>
              <p className="text-muted-foreground">
                Vui lòng đợi trong giây lát...
              </p>
            </div>
          ) : isVerified ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Icon
                  glyph="checkCircle2"
                  className="w-12 h-12 text-green-500"
                />
              </div>
              <h1 className="text-2xl font-bold mb-2">
                Thanh toán thành công!
              </h1>
              <p className="text-muted-foreground mb-6">
                Cảm ơn bạn đã nâng cấp tài khoản. Gói dịch vụ của bạn đã được
                kích hoạt.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="default" onClick={() => navigate("/")}>
                  <Icon glyph="home" className="mr-2" />
                  Trang chủ
                </Button>
                <Button variant="outline" onClick={() => navigate("/profile")}>
                  <Icon glyph="profile" className="mr-2" />
                  Xem tài khoản
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Icon glyph="alertCircle" className="w-12 h-12 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold mb-2">
                Thanh toán không thành công
              </h1>
              <p className="text-muted-foreground mb-6">
                {error || "Đã xảy ra lỗi khi xử lý thanh toán của bạn"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="default"
                  onClick={() => navigate("/subscription")}
                >
                  <Icon glyph="refresh" className="mr-2" />
                  Thử lại
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  <Icon glyph="home" className="mr-2" />
                  Trang chủ
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
