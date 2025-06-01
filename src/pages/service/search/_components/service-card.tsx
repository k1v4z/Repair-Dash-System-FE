import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/icons";
import { useNavigate } from "react-router-dom";
import type { SearchServiceItem } from "@/features/service/types/search.type";
import routePath from "@/config/route";

interface ServiceCardProps {
  service: SearchServiceItem;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(
      `${routePath.serviceDetail.replace(":id", service.service_alias)}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer h-full"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4 h-full flex flex-col">
        <div className="flex gap-3 h-full">
          <div className="shrink-0">
            {service.service_image ? (
              <img
                src={service.service_image}
                alt={service.service_name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                {service.service_name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-grow flex flex-col">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {service.service_name}
                </h3>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-600 line-clamp-1">
                    {service.owner.user_full_name}
                  </span>
                  <span className="mx-2 text-gray-300">•</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <Icon glyph="star" className="text-yellow-400 w-4 h-4 mr-1" />
                  <span className="font-medium text-sm">
                    {service.avg_rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-3 flex flex-wrap gap-2">
              <Badge className="text-xs bg-blue-100 text-blue-800 font-normal hover:bg-blue-200 whitespace-nowrap">
                <Icon
                  glyph="location"
                  className="w-4 h-4 text-blue-500 fill-none mr-1"
                />
                <span>
                  {service.time.charAt(0).toUpperCase() + service.time.slice(1)}
                </span>
              </Badge>
              <Badge className="text-xs bg-green-100 text-gray-800 hover:bg-green-200">
                <Icon
                  glyph="checkCircle"
                  className="w-4 h-4 text-green-500 fill-none mr-1"
                />
                <span className="text-green-500 text-xs">
                  Đã hoàn thành {service.order_times} đơn hàng
                </span>
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
