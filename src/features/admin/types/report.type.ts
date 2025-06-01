import { UserAddress } from "@/types/service";

export type Report = {
  report_id: number;
  report_description: string;
  report_image_url: string | null;
  created_at: string;
  reporter: UserAddress;
};

export type ReportResponse = {
  listReport: Report[];
  limit: number;
  index: number;
  totalPages: number;
  status: number;
};
