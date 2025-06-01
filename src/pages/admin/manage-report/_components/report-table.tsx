import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Icons from "@/components/icons";
import Pagination from "@/components/common/pagination";
import { formatDate } from "@/utils/datetime/date";
import ReportDetailModal from "./report-detail-modal";
import type { Report } from "@/features/admin/types/report.type";
import useReport from "@/features/admin/hooks/useReport";

const LIMIT = 10;

export default function ReportTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { reports, totalPages } = useReport(LIMIT, currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (report: Report) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="border rounded-[14px] border-[#D5D5D5] overflow-hidden">
        <Table className="w-full">
          <TableHeader className="bg-[#FCFDFD]">
            <TableRow>
              {[
                "ID",
                "Nội dung báo cáo",
                "Người báo cáo",
                "Số điện thoại",
                "Ngày báo cáo",
                "Thao tác",
              ].map((header) => (
                <TableHead
                  key={header}
                  className="text-gray-700 text-sm font-bold uppercase py-3 pl-6 h-[50px] last:pl-8"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  Không có báo cáo
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow
                  key={report.report_id}
                  className="border-b hover:bg-gray-50 transition h-[65px]"
                >
                  <TableCell className="py-3 pl-6 text-sm text-gray-800">
                    {report.report_id}
                  </TableCell>
                  <TableCell className="py-3 pl-6 text-sm text-gray-800 ">
                    <p className="line-clamp-1 w-[250px] break-all">
                      {report.report_description}
                    </p>
                  </TableCell>
                  <TableCell className="py-3 pl-6 text-sm text-gray-800">
                    {report.reporter.user_full_name}
                  </TableCell>
                  <TableCell className="py-3 pl-6 text-sm text-gray-800">
                    {report.reporter.user_phone_number}
                  </TableCell>
                  <TableCell className="py-3 pl-6 text-sm text-gray-800">
                    {formatDate(new Date(report.created_at), "vi-VN")}
                  </TableCell>
                  <TableCell className="py-3 pl-6 text-sm text-gray-800">
                    <div
                      className="flex ml-6 items-center gap-2 cursor-pointer px-2"
                      onClick={() => handleViewDetails(report)}
                    >
                      <Icons glyph="eyeNonBorder" className="size-4" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ReportDetailModal
        report={selectedReport}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  );
}
