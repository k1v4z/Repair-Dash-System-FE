import { useState, useEffect } from "react";
import type { Service } from "@/features/store-detail/types/service";
import ServiceItem from "./service-item";

interface ServiceListProps {
  showAll: boolean;
}

const SERVICES = [
  {
    id: 1,
    name: "Dịch vụ sửa chữa máy giặt",
    description:
      "Dịch vụ sửa chữa máy giặt sẽ giúp kiểm tra và khắc phục triệt để các lỗi thường gặp, đảm bảo máy hoạt động ổn định và kéo dài tuổi thọ.",
    image:
      "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Dịch vụ sửa chữa điều hòa",
    description:
      "Dịch vụ sửa chữa điều hòa sẽ kiểm tra hệ thống gas, vệ sinh dàn lạnh, sửa chữa board mạch và các linh kiện quan trọng để đảm bảo hiệu suất làm lạnh tối ưu.",
    image:
      "https://images.unsplash.com/photo-1558919047-80f932b017cf?q=80&w=2573&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Dịch vụ sửa chữa tủ lạnh",
    description:
      "Dịch vụ sửa chữa tủ lạnh sẽ giúp kiểm tra và khắc phục các lỗi liên quan đến hệ thống gas, quạt gió, bộ xả tuyết và motor để tủ hoạt động hiệu quả hơn.",
    image:
      "https://images.unsplash.com/photo-1643494847705-74808059bf07?q=80&w=2630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Dịch vụ sửa chữa lò vi sóng",
    description:
      "Dịch vụ sửa chữa lò vi sóng sẽ kiểm tra các linh kiện như magnetron, cầu chì, motor quay đĩa và cảm biến nhiệt để đảm bảo thiết bị hoạt động an toàn và hiệu quả.",
    image:
      "https://images.unsplash.com/photo-1617713780979-4ae0c726f253?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Dịch vụ sửa chữa tủ lạnh",
    description:
      "Dịch vụ sửa chữa tủ lạnh sẽ giúp kiểm tra và khắc phục các lỗi liên quan đến hệ thống gas, quạt gió, bộ xả tuyết và motor để tủ hoạt động hiệu quả hơn.",
    image:
      "https://images.unsplash.com/photo-1643494847705-74808059bf07?q=80&w=2630&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ServiceList = ({ showAll }: ServiceListProps) => {
  const [serviceList, setServiceList] = useState<Service[]>([]);

  const displayedServices = showAll ? serviceList : serviceList.slice(0, 4);

  useEffect(() => {
    setServiceList(SERVICES);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayedServices.map((service) => (
        <ServiceItem key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
