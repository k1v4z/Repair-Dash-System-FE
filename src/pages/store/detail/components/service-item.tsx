import { useNavigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Service } from "@/features/store/types/store-detail.type";
import Icons from "@/components/icons";
import routePath from "@/config/route";
import DefaultImage from "@/assets/images/servicedefault.png";

interface ServiceItemProps {
  service: Service;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-md h-[400px] relative">
      <div className="h-48 overflow-hidden">
        <img
          src={service.service_image_url ?? DefaultImage}
          onError={(e) => {
            e.currentTarget.src = DefaultImage;
          }}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2 pt-2 px-4">
        <h4 className="text-xl font-semibold line-clamp-1">
          {service.service_name}
        </h4>
        <p className="mt-2 line-clamp-2">{service.service_description}</p>

        <div className="mt-5 absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col w-full gap-2 px-4">
          <div className="flex gap-2">
            {service.average_rating !== null ? (
              <div className="flex items-center gap-1">
                <Icons glyph="star" className="size-4 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {service.average_rating}
                </span>
              </div>
            ) : (
              <Badge className="hover:bg-primary hover:text-primary-foreground">Chưa có đánh giá</Badge>
            )}
            <Link
              to={routePath.serviceDetail.replace(":id", service.service_alias)}
            >
              <Badge className="py-1">Xem chi tiết</Badge>
            </Link>
          </div>
          <Button
            className="bg-primary-royalBlue hover:bg-primary-royalBlue/90 flex-1 py-3 text-center text-white font-semibold"
            onClick={() =>
              navigate(
                routePath.bookingService.replace(
                  ":serviceId",
                  service.service_alias
                )
              )
            }
          >
            Đặt ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
