import { Link, useNavigate } from "react-router-dom";
import Icons from "@/components/icons";
import { Button } from "@/components/ui/button";
import type { Service } from "@/features/store-detail/types/store-detail.type";
import routePath from "@/config/route";

interface ServiceInformationProps {
  service: Service;
}

const ServiceInformation = ({ service }: ServiceInformationProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1">
      <div className="h-80 border rounded-lg shadow p-6 bg-white">
        <h2 className="text-2xl font-bold text-primary-royalBlue text-center mb-4">
          Thông tin dịch vụ
        </h2>

        <div className="mt-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-500">
              Nhà cung cấp dịch vụ
            </p>
            <div className="flex">
              <Icons glyph="store" className="size-5 fill-blue-600 mt-1" />
              <span className="font-medium ml-1">
                {service.owner.user_full_name}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
            <div className="flex">
              <Icons glyph="location" className="w-5 h-5 text-blue-600 mt-1" />
              <span className="font-medium ml-1">
                {`${service.owner.user_street}, ${service.owner.user_ward}, ${service.owner.user_district}, ${service.owner.user_city}`}
              </span>
            </div>
          </div>
          <Button
            className="mt-6 bg-primary-royalBlue hover:bg-primary-royalBlue/90 w-full"
            onClick={() =>
              navigate(
                routePath.bookingService.replace(
                  ":serviceId",
                  service.service_id.toString()
                )
              )
            }
          >
            Đặt dịch vụ
          </Button>
        </div>
        <p className="text-center mt-3">
          Xem thông tin nhà cung cấp dịch vụ{" "}
          <Link
            to={routePath.storeDetail.replace(
              ":id",
              service.owner_id.toString()
            )}
            className="text-primary-royalBlue underline"
          >
            tại đây
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ServiceInformation;
