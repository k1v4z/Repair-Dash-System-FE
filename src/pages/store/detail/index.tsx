import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StoreInformation from "@/pages/store/detail/components/store-infomation";
import StoreDescription from "@/pages/store/detail/components/store-description";
import SwitchableTabs from "@/components/common/switch-tab";
import StoreService from "@/pages/store/detail/components/store-service";
import ResourceNotFound from "@/components/common/resource-not-found";
import useStoreDetail from "@/features/store/hooks/useStoreDetail";
import routePath from "@/config/route";
import DefaultImage from "@/assets/images/servicedefault.png";

const TABS = [
  {
    value: "description",
    label: "Mô tả cửa hàng",
    content: <StoreDescription />,
  },
];

const StoreDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { storeDetail, status, errorMessage } = useStoreDetail(id || "");

  if (status !== 404) toast.error(errorMessage);

  return (
    <>
      {storeDetail?.store?.role !== "STORE" ? (
        <ResourceNotFound
          title="Cửa hàng không tồn tại"
          description="Không tìm thấy cửa hàng bạn tìm kiếm hoặc có thể đã bị xóa."
          buttonText="Quay lại trang chủ"
          onButtonClick={() => navigate(routePath.home)}
        />
      ) : (
        <div className="max-w-[1350px] mx-auto px-4 py-8">
          <div className="flex lg:flex-row flex-col gap-6">
            <div className="lg:w-[60%] border rounded-lg shadow overflow-hidden h-max">
              <img
                src={storeDetail?.store?.user_avatar_url ?? DefaultImage}
                onError={(e) => (e.currentTarget.src = DefaultImage)}
                alt="Service"
                className="w-full h-[280px] object-cover"
              />
            </div>
            <StoreInformation store={storeDetail?.store} />
          </div>

          <div className="mt-14">
            <StoreService />
          </div>

          <div className="mt-14">
            <SwitchableTabs tabs={TABS} defaultTab="description" />
          </div>
        </div>
      )}
    </>
  );
};

export default StoreDetails;
