import { useNavigate } from "react-router-dom";
import ResourceNotFound from "@/components/common/resource-not-found";
import routePath from "@/config/route";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <ResourceNotFound
        title="Không có quyền truy cập"
        description="Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên để được hỗ trợ."
        buttonText="Quay lại trang chủ"
        onButtonClick={() => navigate(routePath.home)}
      />
    </div>
  );
}
