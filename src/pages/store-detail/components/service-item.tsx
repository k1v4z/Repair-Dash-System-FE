import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Service } from "@/features/store-detail/types/store-detail.type";
import routePath from "@/config/route";

interface ServiceItemProps {
  service: Service;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1550041473-d296a3a8a18a?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ServiceItem = ({ service }: ServiceItemProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-md cursor-pointer h-[430px] relative">
      <div className="h-48 overflow-hidden">
        <img
          src={service.service_image_url ?? DEFAULT_IMAGE}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE;
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
        <div className="mt-5 absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col w-full gap-2 px-8">
          <Button
            className=" bg-primary-royalBlue hover:bg-primary-royalBlue/90 flex-1"
            onClick={() =>
              navigate(
                routePath.order.replace(
                  ":serviceId",
                  service.service_id.toString()
                )
              )
            }
          >
            Đặt ngay
          </Button>
          <Link
            to={routePath.serviceDetail.replace(
              ":id",
              service.service_id.toString()
            )}
            className="underline text-primary-royalBlue font-semibold text-center"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
