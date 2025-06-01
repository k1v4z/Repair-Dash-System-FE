import reportApi from "../api/report";
import type { ReportResponse } from "../types/report.type";

const reportServices = {
  getAllReports: async (
    limit: number,
    index: number
  ): Promise<ReportResponse> => {
    const response = await reportApi.getAllReports(limit, index);
    return response;
  },
};

export default reportServices;
