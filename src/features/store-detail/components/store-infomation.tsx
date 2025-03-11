import { Store, MapPin, Briefcase, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const StoreInformation = () => {
  return (
    <div className="flex-1">
      <div className="h-[350px] border rounded-lg shadow p-6 bg-white">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary-royalBlue">
            Thông tin cửa hàng
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary-royalBlue" />
            <span>TechCare</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary-royalBlue" />
            <span>123 Đường Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary-royalBlue" />
            <span>Dịch vụ sửa chữa điện lạnh tại nhà</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary-royalBlue" />
            <span>0987 654 321</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-primary-royalBlue" />
            <span className="ml-2">4.8/5</span>
          </div>
        </div>
        <Button className="block mx-auto bg-primary-royalBlue hover:bg-primary-royalBlue/90">
          Nhấn để đặt dịch vụ
        </Button>
      </div>
    </div>
  );
};

export default StoreInformation;
