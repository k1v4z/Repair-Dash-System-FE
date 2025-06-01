export type ServiceReport = {
    service_name: string;
    service_description: string;
    total_orders: number;
    total_completed_orders: number;
    total_processing_orders: number;
    total_pending_orders: number;
    total_canceled_orders: number;
    completion_rate: number;
    total_favorites: number;
    updated_at: string;
  };