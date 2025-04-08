import Icon from "@/components/icons";
import type { SearchServiceItem } from "@/features/service/types/search.type";
import Pagination from "./pagination";
import ServiceCard from "./service-card";

interface ServiceResultsProps {
  services: SearchServiceItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ServiceResults = ({
  services,
  currentPage,
  totalPages,
  onPageChange,
}: ServiceResultsProps) => {
  return (
    <div>
      {services.length === 0 ? (
        <div className="text-center py-10">
          <Icon
            glyph="search"
            className="mx-auto h-12 w-12 text-gray-400 mb-3"
          />
          <h3 className="text-lg font-medium">Không tìm thấy dịch vụ</h3>
          <p className="text-gray-500 mt-1">Thử điều chỉnh tiêu chí tìm kiếm</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceCard key={service.service_id} service={service} />
          ))}
        </div>
      )}
      {services.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ServiceResults;
