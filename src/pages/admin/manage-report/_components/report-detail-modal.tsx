import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/utils/datetime/date";
import type { Report } from "@/features/admin/types/report.type";
import { Separator } from "@/components/ui/separator";

interface ReportDetailModalProps {
  report: Report | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReportDetailModal({
  report,
  open,
  onOpenChange,
}: ReportDetailModalProps) {
  if (!report) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Chi tiết báo cáo #{report.report_id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-semibold mb-4">Thông tin báo cáo</h3>
            <div className="space-y-4 rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Nội dung báo cáo:
                </p>
                <p className="text-sm text-gray-700">
                  {report.report_description}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Thời gian báo cáo:
                </p>
                <p className="text-sm text-gray-700">
                  {formatDate(new Date(report.created_at), "vi-VN")}
                </p>
              </div>

              {report.report_image_url && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-2">
                      Hình ảnh:
                    </p>
                    <img
                      src={report.report_image_url}
                      alt="Report"
                      className="max-w-[400px] rounded-lg border"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-4">
              Thông tin người báo cáo
            </h3>
            <div className="space-y-4 rounded-lg border p-4">
              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Họ và tên:
                </p>
                <p className="text-sm text-gray-700">
                  {report.reporter.user_full_name}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Số điện thoại:
                </p>
                <p className="text-sm text-gray-700">
                  {report.reporter.user_phone_number}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-gray-800 mb-2">
                  Địa chỉ:
                </p>
                <p className="text-sm text-gray-700">
                  {`${report.reporter.user_street}, ${report.reporter.user_ward}, ${report.reporter.user_district}, ${report.reporter.user_city}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
