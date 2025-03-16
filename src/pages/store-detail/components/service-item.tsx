import type { Service } from "@/features/store-detail/types/service";
import { Button } from "@/components/ui/button";
interface ServiceItemProps {
  service: Service;
}
const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-md cursor-pointer">
      <div className="h-[200px] overflow-hidden">
        <img
          src={service.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2 pt-2 pb-5 px-4">
        <h4 className="text-xl font-semibold line-clamp-1">{service.name}</h4>
        <p className="mt-2 line-clamp-2">{service.description}</p>
        <Button className="mt-5 block mx-auto bg-primary-royalBlue hover:bg-primary-royalBlue/90">
          Đặt dịch vụ
        </Button>
      </div>
    </div>
  );
};

export default ServiceItem;
