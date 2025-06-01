import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OrderByCustomer } from "@/features/order/types/orders.type";
import { formatDate } from "@/utils/datetime/date";
import type { ColumnDef } from "@tanstack/react-table";
import Icon from "@/components/icons";
import { TableCell } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Role } from "@/types/globals.type";

interface OrderTableProps {
  data: OrderByCustomer[];
  isLoading?: boolean;
  onOrderUpdated?: () => void;
  userRole?: Role;
  currentStoreId?: string;
}
interface ActionCellProps {
  order: OrderByCustomer;
}

const ActionCell = ({ order }: ActionCellProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/booking-detail/${order.order_id}`);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        onClick={handleClick}
      >
        <Icon 
          glyph="eyeNonBorder" 
          className="h-4 w-4 text-gray-500" 
        />
      </Button>
    </div>
  );
};

const ServiceNameCell = ({ 
  serviceName, 
  description, 
  orderId 
}: { 
  serviceName: string; 
  description: string; 
  orderId: number;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/booking-detail/${orderId}`);
  };

  return (
    <div 
      className="flex flex-col cursor-pointer hover:text-blue-600 transition-colors duration-200 min-w-0 max-w-[250px]"
      onClick={handleClick}
    >
      <span className="font-medium truncate w-full" title={serviceName}>
        {serviceName}
      </span>
      <span
        className="text-sm text-gray-500 truncate w-full"
        title={description}
      >
        {description}
      </span>
    </div>
  );
};

const columns = (
): ColumnDef<OrderByCustomer>[] => [
  {
    accessorKey: "service_name",
    header: "Dịch vụ",
    size: 250,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("service_name") as string;
      const b = rowB.getValue("service_name") as string;
      return a.localeCompare(b, "vi", { sensitivity: "base" });
    },
    cell: ({ row }) => {
      const serviceName = row.getValue("service_name") as string;
      const description = row.original.service_description as string;
      
      return (
        <ServiceNameCell 
          serviceName={serviceName}
          description={description}
          orderId={row.original.order_id}
        />
      );
    },
  },
  {
    accessorKey: "store_full_name",
    header: "Cửa hàng",
    size: 200,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("store_full_name") as string;
      const b = rowB.getValue("store_full_name") as string;
      return a.localeCompare(b, "vi", { sensitivity: "base" });
    },
    cell: ({ row }) => {
      const storeName = row.getValue("store_full_name") as string;
      const address = row.original.store_address as string;
      return (
        <div className="flex flex-col min-w-0 max-w-[200px]">
          <span className="font-medium truncate w-full" title={storeName}>
            {storeName}
          </span>
          <span
            className="text-sm text-gray-500 truncate w-full"
            title={address}
          >
            {address}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "employee_full_name",
    header: "Nhân viên",
    size: 150,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("employee_full_name") as string | null;
      const b = rowB.getValue("employee_full_name") as string | null;

      // Handle null values - put "Chưa phân công" at the end
      if (!a && !b) return 0;
      if (!a) return 1;
      if (!b) return -1;

      return a.localeCompare(b, "vi", { sensitivity: "base" });
    },
    cell: ({ row }) => {
      const employeeName = row.getValue("employee_full_name") as string | null;
      const displayName = employeeName || "Chưa phân công";
      return (
        <div className="min-w-0 max-w-[150px]">
          <span
            className="font-medium truncate w-full block"
            title={displayName}
          >
            {displayName}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "customer_full_name",
    header: "Khách hàng",
    size: 200,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue("customer_full_name") as string;
      const b = rowB.getValue("customer_full_name") as string;
      return a.localeCompare(b, "vi", { sensitivity: "base" });
    },
    cell: ({ row }) => {
      const customerName = row.getValue("customer_full_name") as string;
      const phone = row.original.customer_phone_number as string;
      const address = row.original.customer_address as string;
      return (
        <div className="flex flex-col min-w-0 max-w-[200px]">
          <span className="font-medium truncate w-full" title={customerName}>
            {customerName}
          </span>
          <span className="text-sm text-gray-500 truncate w-full" title={phone}>
            {phone}
          </span>
          <span
            className="text-sm text-gray-500 truncate w-full"
            title={address}
          >
            {address}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "order_status",
    header: "Trạng thái",
    size: 120,
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const statusOrder = {
        PENDING: 1,
        PROCESSING: 2,
        COMPLETED: 3,
        CANCELED: 4,
      };

      const a = rowA.getValue("order_status") as string;
      const b = rowB.getValue("order_status") as string;

      return (
        (statusOrder[a as keyof typeof statusOrder] || 5) -
        (statusOrder[b as keyof typeof statusOrder] || 5)
      );
    },
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
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = new Date(rowA.getValue("created_at") as string);
      const b = new Date(rowB.getValue("created_at") as string);
      return a.getTime() - b.getTime();
    },
    cell: ({ row }) => {
      const date = row.getValue("created_at") as string;
      return formatDate(new Date(date));
    },
  },
  {
    id: "actions",
    header: "Hành động",
    size: 70,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <ActionCell 
          order={row.original} 
        />
      );
    },
  },
];

export function OrderTable({
  data,
  isLoading = false,
}: OrderTableProps) {
  const tableColumns = columns();
  
  return (
    <DataTable
      columns={tableColumns}
      data={data}
      loading={isLoading}
    />
  );
}
