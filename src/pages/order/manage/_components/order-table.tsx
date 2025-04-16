import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OrderByCustomer } from "@/features/order/types/orders.type";
import { formatDate } from "@/utils/datetime/date";
import type { ColumnDef } from "@tanstack/react-table";
import Icon from "@/components/icons";
import { TableCell } from "@/components/ui/table";

interface OrderTableProps {
  data: OrderByCustomer[];
  isLoading?: boolean;
  onOrderUpdated?: () => void;
}

interface ActionCellProps {
  order: OrderByCustomer;
  onOrderUpdated?: () => void;
}

const ActionCell = ({ order }: ActionCellProps) => {

  const handleView = () => {
    window.open(`/booking-detail/${order.order_id}`, "_blank");
  };

  return (
    <>
      <Button 
        variant="ghost" 
        className="h-8 w-8 p-0"
        onClick={() => handleView()}
      >
        <Icon glyph="eyeNonBorder" className="h-4 w-4" />
      </Button>
    </>
  );
};

const columns = (onOrderUpdated?: () => void): ColumnDef<OrderByCustomer>[] => [
  {
    accessorKey: "service_name",
    header: "Dịch vụ",
    size: 250,
    cell: ({ row }) => {
      const serviceName = row.getValue("service_name") as string;
      const description = row.original.service_description as string;

      return (
        <div className="flex flex-col cursor-pointer hover:text-blue-600 transition-colors duration-200 min-w-0 max-w-[250px]">
          <span className="font-medium truncate w-full" title={serviceName}>{serviceName}</span>
          <span className="text-sm text-gray-500 truncate w-full" title={description}>{description}</span>
        </div>
      );
    },
  },  
  {
    accessorKey: "store_full_name",
    header: "Cửa hàng",
    size: 200,
    cell: ({ row }) => {
      const storeName = row.getValue("store_full_name") as string;
      const address = row.original.store_address as string;
      return (
        <div className="flex flex-col min-w-0 max-w-[200px]">
          <span className="font-medium truncate w-full" title={storeName}>{storeName}</span>
          <span className="text-sm text-gray-500 truncate w-full" title={address}>{address}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "employee_full_name",
    header: "Nhân viên",
    size: 150,
    cell: ({ row }) => {
      const employeeName = row.getValue("employee_full_name") as string | null;
      const displayName = employeeName || "Chưa phân công";
      return (
        <div className="min-w-0 max-w-[150px]">
          <span className="font-medium truncate w-full block" title={displayName}>{displayName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "customer_full_name",
    header: "Khách hàng",
    size: 200,
    cell: ({ row }) => {
      const customerName = row.getValue("customer_full_name") as string;
      const phone = row.original.customer_phone_number as string;
      const address = row.original.customer_address as string;
      return (
        <div className="flex flex-col min-w-0 max-w-[200px]">
          <span className="font-medium truncate w-full" title={customerName}>{customerName}</span>
          <span className="text-sm text-gray-500 truncate w-full" title={phone}>{phone}</span>
          <span className="text-sm text-gray-500 truncate w-full" title={address}>{address}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "order_status",
    header: () => (
      <div className="text-center w-full">Trạng thái</div>
    ),
    size: 120,
    cell: ({ row }) => {
      const status = row.getValue("order_status") as string;
      const statusMap: Record<string, { label: string; color: string }> = {
        COMPLETED: { label: "Hoàn thành", color: "bg-green-500" },
        PROCESSING: { label: "Đang xử lý", color: "bg-blue-500" },
        PENDING: { label: "Chờ xử lý", color: "bg-yellow-500" },
        CANCELED: { label: "Đã hủy", color: "bg-red-500" },
      };

      const defaultStatus = { label: "Không xác định", color: "bg-gray-500" };
      const currentStatus = statusMap[status] || defaultStatus;

      return (
        <TableCell className="text-center px-0">
          <div className="flex justify-center w-full">
            <Badge className={`${currentStatus.color} px-3`}>
              {currentStatus.label}
            </Badge>
          </div>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Ngày tạo",
    size: 120,
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string;
      return formatDate(new Date(date));
    },
  },
  {
    id: "actions",
    header: "Hành động",
    size: 70,
    cell: ({ row }) => {
      return <ActionCell order={row.original} onOrderUpdated={onOrderUpdated} />;
    },
  },
];

export function OrderTable({
  data,
  isLoading = false,
  onOrderUpdated,
}: OrderTableProps) {
  return (
    <DataTable
      columns={columns(onOrderUpdated)}
      data={data}
      loading={isLoading}
    />
  );
}
