import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServiceInformation from "./_components/service-information";
import ServiceReview from "./_components/service-review";
import useServiceById from "@/features/service/hooks/useServiceDetail";
import useFavorite from "@/features/service/hooks/useFavorite";
import Icons from "@/components/icons";
import ResourceNotFound from "@/components/common/resource-not-found";
import routePath from "@/config/route";
import DefaultImage from "@/assets/images/servicedefault.png";
import { cn } from "@/lib/utils";

const ServiceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { serviceDetail, status } = useServiceById(id || "");
  const [favoriteId, setFavoriteId] = useState< null | -1 | number>(null);

  useEffect(() => {
    if (serviceDetail?.service?.favorite_id !== undefined) {
      setFavoriteId(serviceDetail.service.favorite_id);
    }
  }, [serviceDetail?.service?.favorite_id]);

  const { toggleFavorite } = useFavorite({
    serviceId: serviceDetail?.service?.service_id || 0,
    favorite: favoriteId,
    onChange: (newFavorite) => {
      setFavoriteId(newFavorite);
    }
  });

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
          <div className="flex justify-between items-center w-full xl:w-[60%]">
            <h2 className="text-3xl font-bold text-gray-900">
              {serviceDetail?.service?.service_name}
            </h2>
            <div className="cursor-pointer" onClick={toggleFavorite}>
              <Icons
                glyph="bookMark"
                className={cn(
                  "mt-3 size-7",
                  typeof favoriteId === 'number' && favoriteId > 0
                    ? "fill-yellow-500 stroke-yellow-500"
                    : "fill-none stroke-gray-400"
                )}
              />
            </div>
          </div>
          <div className="mt-1 mb-3 flex items-center gap-1">
            <div className="mt-1 flex gap-1">
              <Icons glyph="star" className="size-5 text-yellow-400 mt-[1px]" />
              <span className="font-semibold">
                {serviceDetail?.service?.average_rating === null
                  ? ""
                  : serviceDetail?.service?.average_rating}
              </span>
            </div>

            <span className="mt-1 ml-1 text-gray-500">
              ({serviceDetail?.service?.total_reviews} đánh giá)
            </span>
          </div>
          <div className="flex xl:flex-row flex-col gap-6 mt-6">
            <div className="xl:w-[60%] h-max">
              <img
                src={serviceDetail?.service?.service_image_url ?? DefaultImage}
                onError={(e) => (e.currentTarget.src = DefaultImage)}
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
