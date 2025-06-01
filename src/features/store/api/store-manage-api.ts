import { axiosInstance } from "@/config/axios";
import type {
  UpdateServiceRequest,
  AddServiceRequest,
  ServiceResponse,
  EmployeeResponse,
  ReportResponse,
  ServiceOrderResponse,
} from "../../store/types/store-manage.type";
import type { AddEmployeeRequest ,UpdateEmployeeRequest} from "../../store/types/store.type";
const STORE_ENDPOINTS = {
  GET_SERVICES_BY_OWNER: "/profile",
  DELETE_SERVICE: "/services/:serviceId",
  UPDATE_SERVICE: "/services/:serviceId",
  ADD_SERVICE: "/services",
  GET_EMPLOYEES: "/employees",
  ADD_EMPLOYEE: "/employees",
  UPDATE_EMPLOYEE: "/employees/:employeeId",
  DELETE_EMPLOYEE: "/employees/:employeeId",
  GET_REPORT: "/reports/services",
  GET_ORDER_BY_SERVICE: "/reports/services/:serviceId",
};

export const storeManageApi = {
  getServicesByOwner: async (
    current_page: number,
    limit: number
  ): Promise<ServiceResponse> => {
    try {
      const response = await axiosInstance.get(
        STORE_ENDPOINTS.GET_SERVICES_BY_OWNER,
        {
          params: {
            current_page,
            limit,
          },
        }
      );

      return {
        listService: response.data.profile.services || [],
        totalPages: response.data.total_pages,
        currentPage: response.data.current_page,
      };
    } catch (error) {
      console.error("Error");
      throw error;
    }
  },
  deleteService: async (serviceId: string) => {
    try {
      const response = await axiosInstance.delete(
        STORE_ENDPOINTS.DELETE_SERVICE.replace(":serviceId", serviceId)
      );
      return response.data;
    } catch (error) {
      console.error("Error");
      throw error;
    }
  },
  updateService: async (serviceId: string, data: UpdateServiceRequest) => {
    try {
      const response = await axiosInstance.put(
        STORE_ENDPOINTS.UPDATE_SERVICE.replace(":serviceId", serviceId),
        data
      );
      return response;
    } catch (error) {
      console.error("Error");
      throw error;
    }
  },
  addService: async (data: AddServiceRequest) => {
    try {
      const response = await axiosInstance.post(
        STORE_ENDPOINTS.ADD_SERVICE,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error");
      throw error;
    }
  },
  getEmployees: async (
    current_page: number,
    limit: number
  ): Promise<EmployeeResponse> => {
    try {
      const response = await axiosInstance.get(
        STORE_ENDPOINTS.GET_EMPLOYEES,
        {
          params: {
            current_page,
            limit,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching employees");
      throw error;
    }
  },
  addEmployee: async (data: AddEmployeeRequest) => {
    try {
      const response = await axiosInstance.post(
        STORE_ENDPOINTS.ADD_EMPLOYEE,
        data
      );  
      return response.data;
    } catch (error) {
      console.error("Error adding employee");
      throw error;
    }
  },
  updateEmployee: async (employeeId: string, data: UpdateEmployeeRequest) => {
    try {
      const response = await axiosInstance.put(
        STORE_ENDPOINTS.UPDATE_EMPLOYEE.replace(":employeeId", employeeId),
        data
      );  
      return response.data;
    } catch (error) {
      console.error("Error updating employee");
      throw error;
    }
  },
  deleteEmployee: async (employeeId: string) => {
    try {
      const response = await axiosInstance.delete(
        STORE_ENDPOINTS.DELETE_EMPLOYEE.replace(":employeeId", employeeId)
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting employee");
      throw error;
    }
  },
  getReport: async (page: number, limit: number): Promise<ReportResponse> => {
    try {
      const response = await axiosInstance.get(
        STORE_ENDPOINTS.GET_REPORT,
        {
          params: {
            index: page,
            max_range: limit,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching service report");
      throw error;
    }
  },
  getOrderByService: async (serviceId: string, page: number, limit: number): Promise<ServiceOrderResponse> => {
    try {
      const response = await axiosInstance.get(
        STORE_ENDPOINTS.GET_ORDER_BY_SERVICE.replace(":serviceId", serviceId),
        {
          params: {
            index: page,
            max_range: limit,
          },
        }
      );
      return {
        orders: response.data.service.orders || [],
        monthly_report: response.data.monthly_report,
        total_pages: response.data.total_pages,
        current_page: response.data.current_page,
        limit: limit
      };
    } catch (error) {
      console.error("Error fetching order by service:", error);
      throw error;
    }
  },
};
