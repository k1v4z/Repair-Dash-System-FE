import { useState, useEffect } from "react";
import reportServices from "../services/report.service";
import type { Report } from "../types/report.type";
import { toast } from "react-toastify";

const useReport = (limit: number, currentPage: number) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchReports(limit, currentPage);
  }, [currentPage]);

  const fetchReports = async (limit: number, currentPage: number) => {
    try {
      const response = await reportServices.getAllReports(limit, currentPage);
      setReports(response.listReport);
      setTotalPages(response.totalPages);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại");
    }
  };

  return {
    reports,
    totalPages,
  };
};

export default useReport;
