import Icons from "@/components/icons";
import Rating from "@/components/common/rating";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DefaultImage from "@/assets/images/servicedefault.png";

interface ServiceMarkItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: any;
}
const ServiceMarkItem = ({ service }: ServiceMarkItemProps) => {
  return (
    <Card className="overflow-hidden border-gray-200 hover:shadow-lg transition-all hover:-translate-x-[5px] h-[70px] rounded-[2px] cursor-pointer">
      <CardContent className="p-0 flex h-full">
        <div className="relative h-full w-[10%]">
          <img
            src={service.service_image_url ?? DefaultImage}
            onError={(e) => {
              e.currentTarget.src = DefaultImage;
            }}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col py-1 px-2 flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between gap-2 flex-1">
              <h2 className="font-semibold text-lg">{service.service_name}</h2>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-red-500 hover:bg-red-50 ml-auto size-2"
              >
                <Icons glyph="trash" className="size-5" />
                <span className="sr-only">Xóa</span>
              </Button>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-sm mt-2 text-gray-700 max-w-[300px] line-clamp-1 ">
              Nhà cung cấp dịch vụ: <span>{service.user_full_name}</span>
            </p>
            <div className="flex items-center">
              {service.average_rating !== null ? (
                <>
                  <Rating number={service.average_rating} />
                  <span className="text-sm text-gray-600">
                    ({service.average_rating})
                  </span>
                </>
              ) : (
                <span>Chưa có đánh giá</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceMarkItem;
