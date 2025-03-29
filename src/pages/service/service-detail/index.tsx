import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceInformation from "./_components/service-information";
import ServiceReview from "./_components/service-review";
import useServiceById from "@/features/service-detail/hooks/useServiceDetail";
import Icons from "@/components/icons";
import ResourceNotFound from "@/components/common/resource-not-found";
import routePath from "@/config/route";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1550041473-d296a3a8a18a?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { serviceDetail, status, errorMessage } = useServiceById(id || "");

  if (status !== 404) toast.error(errorMessage);

  return (
    <>
      {status === 404 || status === 400 ? (
        <ResourceNotFound
          title="Dịch vụ không tồn tại"
          description="Không tìm thấy dịch vụ bạn tìm kiếm hoặc có thể đã bị xóa."
          buttonText="Quay lại trang chủ"
          onButtonClick={() => navigate(routePath.home)}
        />
      ) : (
        <div className="max-w-[1440px] mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {serviceDetail?.service?.service_name}
          </h2>
          <div className="mt-2 flex items-center gap-1">
            <div className="mt-1 flex gap-1">
              <Icons
                glyph="star"
                className="w-5 h-5 text-yellow-400 mt-[1px]"
              />
              <span className="font-semibold">
                {serviceDetail?.averageRating ?? 0}
              </span>
            </div>

            <span className="mt-1 ml-1 text-gray-500">
              ({serviceDetail?.totalReviews} đánh giá)
            </span>
          </div>

          <div className="flex lg:flex-row flex-col gap-6 mt-6">
            <div className="lg:w-[60%] h-max">
              <img
                src={serviceDetail?.service?.service_image_url ?? DEFAULT_IMAGE}
                onError={(e) => (e.currentTarget.src = DEFAULT_IMAGE)}
                alt="Service"
                className="w-full h-[600px] object-cover border rounded-lg shadow"
              />
              {/* service description */}
              <div className="mt-10 w-full border rounded-lg shadow py-4 px-6 bg-white">
                <h5 className="font-semibold text-xl">Chi tiết dịch vụ</h5>
                <p className="text-gray-700 text-lg leading-relaxed mt-4">
                  {serviceDetail?.service?.service_description}
                </p>
              </div>
            </div>
            <div className="flex-1">
              {serviceDetail?.service && (
                <ServiceInformation service={serviceDetail.service} />
              )}
              {serviceDetail?.service && (
                <ServiceReview reviews={serviceDetail.service.orders} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetail;
