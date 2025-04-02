import { useParams } from "react-router-dom";
import ServiceItem from "./service-item";
import useServiceByStore from "@/features/store/hooks/useServiceByStore";
import ServiceSkeleton from "./service-skeleton";

interface ServiceListProps {
  showAll: boolean;
}

const ServiceList = ({ showAll }: ServiceListProps) => {
  const { id } = useParams();

  const { serviceList, loading, error } = useServiceByStore(id ?? "");

  const displayedServices = showAll ? serviceList : serviceList.slice(0, 4);

  if (loading) return <ServiceSkeleton />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {displayedServices.length === 0 ? (
        <p className="text-center col-span-4">Không có dịch vụ nào</p>
      ) : (
        displayedServices.map((item) => (
          <ServiceItem key={item.service_id} service={item} />
        ))
      )}
    </div>
  );
};

export default ServiceList;
