import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Order } from "@/features/order/types/orders.type";
import { formatDateToVietnamese } from "@/utils/datetime";
import { Avatar } from "@/components/ui/avatar";
import TechnicianInformation from "./technician-information";
import Icon from "@/components/icons";

interface ServiceInformationProps {
  order: Order;
}

export default function ServiceInformation({ order }: ServiceInformationProps) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Thông tin dịch vụ & cửa hàng</CardTitle>
        <CardDescription>
          Chi tiết về dịch vụ bạn đặt và thông tin cửa hàng
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pb-0">
        <div className="flex items-start gap-4">
          <Avatar className="size-14 rounded-md border border-gray-200">
            {order.service.owner.user_avatar_url && (
              <img
                src={order.service.owner.user_avatar_url}
                alt={order.store_full_name}
                className="object-cover"
              />
            )}
          </Avatar>
          <div>
            <h3 className="font-medium">Cửa hàng</h3>
            <p className="text-lg font-semibold">{order.store_full_name}</p>
            <p className="text-sm text-gray-500">
              <span className="inline-block mr-2">
                <Icon glyph="location" className="size-4" />
              </span>
              {order.store_address}
            </p>
            <p className="text-sm text-gray-500">
              <span className="inline-block mr-2">
                <Icon glyph="phone" className="size-4" />
              </span>
              <a
                href={`tel:${order.store_phone_number}`}
                className="hover:underline"
              >
                {order.store_phone_number}
              </a>
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Dịch vụ</h3>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="font-semibold">{order.service_name}</p>
            <p className="text-sm text-gray-600 mt-1">
              {order.service_description}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Ngày đặt lịch</h3>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm flex items-center">
              <span className="inline-block mr-2">
                <Icon glyph="calendar" className="size-4" />
              </span>
              {formatDateToVietnamese(order.created_at)}
            </p>
          </div>
        </div>
      </CardContent>
      <TechnicianInformation order={order} />
    </Card>
  );
}
