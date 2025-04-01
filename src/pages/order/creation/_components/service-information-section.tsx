import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icons from "@/components/icons";
import type { Service } from "@/types/service";
import { useNavigate, useParams } from "react-router-dom";
import routePath from "@/config/route";

export interface ServiceInformationProps {
  service: Service;
  isLoading?: boolean;
}

export default function ServiceInformationSection({
  service,
  isLoading = false,
}: ServiceInformationProps) {
  const navigate = useNavigate();
  const { serviceId } = useParams<{ serviceId: string }>();

  return (
    <Card className="p-6 space-y-6 h-fit">
      <h2 className="text-2xl font-semibold text-blue-700 text-left">
        Thông tin dịch vụ
      </h2>
      <div className="space-y-6">
        <img
          src={service.service_image_url}
          alt="Service"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icons glyph="location" className="w-5 h-5 text-blue-600 mt-1" />
            <p className="text-gray-600">{`${service.owner.user_street}, ${service.owner.user_ward} , ${service.owner.user_district}, ${service.owner.user_city}`}</p>
          </div>
          <div className="flex items-start gap-3">
            <Icons glyph="store" className="size-5 fill-blue-600 mt-1" />
            <p className="text-gray-600">{service.owner.user_full_name}</p>
          </div>
          <div className="flex items-start gap-3">
            <Icons glyph="wrench" className="size-5 fill-blue-600 mt-1" />
            <p className="text-gray-600">{service.service_name}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            {service.owner.employees.length > 0 ? (
              <>
                <p className="font-medium text-blue-700">Số kĩ thuật viên</p>
                <p className="text-blue-600">
                  {service.owner.employees.length} kĩ thuật viên đang sẵn sàng
                  phục vụ
                </p>
              </>
            ) : (
              <p className="text-gray-600 font-normal">
                Tạm thời không có nhân viên
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              navigate(routePath.serviceDetail.replace(":id", serviceId || ""))
            }
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Huỷ
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Đang xử lý...
              </div>
            ) : (
              "Đặt dịch vụ"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
