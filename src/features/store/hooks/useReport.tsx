import { useState, useEffect } from 'react';
import { storeManageServices } from '../services/store.service';
import type { ReportResponse, ServiceOrder } from '../types/store-manage.type';
import type { OrderStatus } from '@/features/order/types/orders.type';

interface UseReportReturn {
  reportData: ReportResponse | null;
  currentPage: number;
  isLoading: boolean;
  error: Error | null;
  setCurrentPage: (page: number) => void;
  refreshReport: () => Promise<void>;
  orders: ServiceOrder[];
  isLoadingOrders: boolean;
  selectedStatus: "ALL" | OrderStatus;
  setSelectedStatus: (status: "ALL" | OrderStatus) => void;
  getOrdersByService: (serviceId: string) => Promise<void>;
}

export const useReport = (pageSize: number = 10): UseReportReturn => {
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | OrderStatus>("ALL");

  const fetchReport = async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await storeManageServices.getReport({
        page,
        limit: pageSize,
      });
      setReportData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch report'));
      console.error('Error fetching report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrdersByService = async (serviceId: string) => {
    if (!serviceId) {
      setOrders([]);
      return;
    }

    setIsLoadingOrders(true);
    try {
      const response = await storeManageServices.getOrderByService(serviceId, {
        page: 1,
        limit: 100,
      });
      
      const filteredOrders = selectedStatus !== "ALL"
        ? (response.orders || []).filter(order => order.order_status === selectedStatus)
        : (response.orders || []);
      
      setOrders(filteredOrders);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchReport(currentPage);
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const refreshReport = async () => {
    await fetchReport(currentPage);
  };

  return {
    reportData,
    currentPage,
    isLoading,
    error,
    setCurrentPage: handlePageChange,
    refreshReport,
    orders,
    isLoadingOrders,
    selectedStatus,
    setSelectedStatus,
    getOrdersByService,
  };
};
