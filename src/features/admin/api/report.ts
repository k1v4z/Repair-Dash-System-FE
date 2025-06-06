import { axiosInstance } from "@/config/axios";
import type { ReportResponse } from "../types/report.type";

const REPORT_ENDPOINTS = {
  GET_ALL_REPORTS: "/report/admin",
};

const reportApi = {
  getAllReports: async (
    limit: number,
    index: number
  ): Promise<ReportResponse> => {
    try {
      const response = await axiosInstance.get(
        REPORT_ENDPOINTS.GET_ALL_REPORTS,
        {
          params: {
            limit,
            index,
          },
        }
      );
      return {
        listReport: response.data.data.listReport,
        limit: response.data.data.limit,
        index: response.data.data.index,
        totalPages: response.data.data.totalPages,
        status: response.status,
      };
    } catch (error) {
      console.error("Error fetching reports");
      throw error;
    }
  },
};

export default reportApi;
