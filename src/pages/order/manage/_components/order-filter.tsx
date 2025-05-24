import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import type { OrderByCustomer } from "@/features/order/types/orders.type";

interface OrderFilterProps {
  orders?: OrderByCustomer[];
  onFilter: (filteredOrders: OrderByCustomer[]) => void;
}

interface FilterState {
  status: string;
  employeeName: string;
  customerName: string;
  serviceName: string;
  fromDate: string;
  toDate: string;
}

const statusMap: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  COMPLETED: {
    label: "Hoàn thành",
    color: "text-green-700",
    bgColor: "bg-green-100 border-green-200",
  },
  PROCESSING: {
    label: "Đang xử lý",
    color: "text-blue-700",
    bgColor: "bg-blue-100 border-blue-200",
  },
  PENDING: {
    label: "Chờ xử lý",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100 border-yellow-200",
  },
  CANCELED: {
    label: "Đã hủy",
    color: "text-red-700",
    bgColor: "bg-red-100 border-red-200",
  },
};

export function OrderFilter({ orders = [], onFilter }: OrderFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    status: "ALL",
    employeeName: "ALL",
    customerName: "",
    serviceName: "ALL",
    fromDate: "",
    toDate: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique values for dropdown options
  const getUniqueEmployees = () => {
    const employees = orders
      .filter((order) => order.employee_full_name)
      .map((order) => order.employee_full_name)
      .filter((name): name is string => name !== null)
      .filter((name, index, arr) => arr.indexOf(name) === index)
      .sort();
    return employees;
  };

  const getUniqueServices = () => {
    const services = orders
      .map((order) => order.service_name)
      .filter((name, index, arr) => arr.indexOf(name) === index)
      .sort();
    return services;
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters: FilterState) => {
    const safeOrders = Array.isArray(orders) ? orders : [];
    let filteredOrders = [...safeOrders];

    // Filter by status
    if (currentFilters.status !== "ALL") {
      filteredOrders = filteredOrders.filter(
        (order) => order.order_status === currentFilters.status
      );
    }

    // Filter by employee name
    if (currentFilters.employeeName !== "ALL") {
      filteredOrders = filteredOrders.filter(
        (order) => order.employee_full_name === currentFilters.employeeName
      );
    }

    // Filter by customer name (case-insensitive search)
    if (currentFilters.customerName.trim()) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customer_full_name
          .toLowerCase()
          .includes(currentFilters.customerName.toLowerCase().trim())
      );
    }

    // Filter by service name
    if (currentFilters.serviceName !== "ALL") {
      filteredOrders = filteredOrders.filter(
        (order) => order.service_name === currentFilters.serviceName
      );
    }

    // Filter by date range
    if (currentFilters.fromDate) {
      const fromDate = new Date(currentFilters.fromDate);
      filteredOrders = filteredOrders.filter((order) => {
        const orderDate = new Date(order.created_at);
        return orderDate >= fromDate;
      });
    }

    if (currentFilters.toDate) {
      const toDate = new Date(currentFilters.toDate);
      toDate.setHours(23, 59, 59, 999); // Include the entire end date
      filteredOrders = filteredOrders.filter((order) => {
        const orderDate = new Date(order.created_at);
        return orderDate <= toDate;
      });
    }

    onFilter(filteredOrders);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      status: "ALL",
      employeeName: "ALL",
      customerName: "",
      serviceName: "ALL",
      fromDate: "",
      toDate: "",
    };
    setFilters(resetFilters);
    onFilter(Array.isArray(orders) ? orders : []);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status !== "ALL") count++;
    if (filters.employeeName !== "ALL") count++;
    if (filters.customerName.trim()) count++;
    if (filters.serviceName !== "ALL") count++;
    if (filters.fromDate) count++;
    if (filters.toDate) count++;
    return count;
  };

  const uniqueEmployees = getUniqueEmployees();
  const uniqueServices = getUniqueServices();
  const activeFiltersCount = getActiveFiltersCount();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="shadow-lg border-0 bg-white overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Icon glyph="search" className="h-5 w-5 text-blue-600" />
              </motion.div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Bộ lọc đơn hàng
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Tìm kiếm và lọc đơn hàng theo tiêu chí
                </p>
              </div>
              <AnimatePresence>
                {activeFiltersCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 border-blue-200 font-medium px-3 py-1"
                    >
                      {activeFiltersCount} bộ lọc
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg h-10 w-10 p-0"
              >
                <Icon
                  glyph="chevron"
                  className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </motion.div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-6 space-y-8">
                  {/* Primary Filters Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Status Filter */}
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Icon
                          glyph="checkCircle"
                          className="h-4 w-4 text-blue-500"
                        />
                        Trạng thái
                      </Label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) =>
                          handleFilterChange("status", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-300">
                          <SelectValue placeholder="Tất cả trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">
                            <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                              <span className="font-medium">Tất cả</span>
                            </div>
                          </SelectItem>
                          {Object.entries(statusMap).map(
                            ([value, { label, bgColor }]) => (
                              <SelectItem key={value} value={value}>
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-2.5 h-2.5 rounded-full ${bgColor
                                      .split(" ")[0]
                                      .replace("bg-", "bg-")
                                      .replace("-100", "-500")}`}
                                  />
                                  <span className="font-medium">{label}</span>
                                </div>
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Employee Filter */}
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Icon
                          glyph="userRound"
                          className="h-4 w-4 text-blue-500"
                        />
                        Nhân viên
                      </Label>
                      <Select
                        value={filters.employeeName}
                        onValueChange={(value) =>
                          handleFilterChange("employeeName", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-300">
                          <SelectValue placeholder="Tất cả nhân viên" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">
                            <span className="font-medium">
                              Tất cả nhân viên
                            </span>
                          </SelectItem>
                          {uniqueEmployees.map((employee) => (
                            <SelectItem key={employee} value={employee}>
                              <span className="font-medium">{employee}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Service Filter */}
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Icon
                          glyph="wrench"
                          className="h-4 w-4 text-blue-500"
                        />
                        Dịch vụ
                      </Label>
                      <Select
                        value={filters.serviceName}
                        onValueChange={(value) =>
                          handleFilterChange("serviceName", value)
                        }
                      >
                        <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-300">
                          <SelectValue placeholder="Tất cả dịch vụ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ALL">
                            <span className="font-medium">Tất cả dịch vụ</span>
                          </SelectItem>
                          {uniqueServices.map((service) => (
                            <SelectItem key={service} value={service}>
                              <span className="font-medium">{service}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Customer Name Filter */}
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Icon
                          glyph="search"
                          className="h-4 w-4 text-blue-500"
                        />
                        Tên khách hàng
                      </Label>
                      <Input
                        placeholder="Tìm kiếm khách hàng..."
                        value={filters.customerName}
                        onChange={(e) =>
                          handleFilterChange("customerName", e.target.value)
                        }
                        className="h-12 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-300 pl-4"
                      />
                    </motion.div>
                  </div>

                  {/* Date Range Filters */}
                  <motion.div
                    className="border-t border-gray-100 pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg">
                        <Icon
                          glyph="calendar"
                          className="h-4 w-4 text-blue-600"
                        />
                      </div>
                      <Label className="text-base font-semibold text-gray-800">
                        Khoảng thời gian
                      </Label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xs">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-600">
                          Từ ngày
                        </Label>
                        <Input
                          type="date"
                          value={filters.fromDate}
                          onChange={(e) =>
                            handleFilterChange("fromDate", e.target.value)
                          }
                          className="h-12 w-34 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-gray-600">
                          Đến ngày
                        </Label>
                        <Input
                          type="date"
                          value={filters.toDate}
                          onChange={(e) =>
                            handleFilterChange("toDate", e.target.value)
                          }
                          className="h-12 w-34 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-300"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Actions */}
                  <motion.div
                    className="flex items-center justify-between pt-6 border-t border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="text-sm text-gray-600">
                      {activeFiltersCount > 0 ? (
                        <span className="font-medium">
                          Đang áp dụng {activeFiltersCount} bộ lọc
                        </span>
                      ) : (
                        <span>Chưa có bộ lọc nào được áp dụng</span>
                      )}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        className="h-11 px-6 text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
                        disabled={activeFiltersCount === 0}
                      >
                        <Icon glyph="refresh" className="h-4 w-4 mr-2" />
                        Đặt lại bộ lọc
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
