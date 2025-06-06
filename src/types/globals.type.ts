import { Glyph } from "@/components/icons/glyphs";

export type Option<T = Record<string, unknown>> = T & {
  value: string;
  label?: string;
};

export type TabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
};

export interface Column<T> {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (props: { row: { original: T } }) => React.ReactNode;
  enableSorting?: boolean;
}

export interface AxiosResponse<T = undefined> {
  status: number;
  message: string;
  data?: T;
}

export type Role = "STORE" | "CUSTOMER" | "ADMIN";

export type DialogContent = {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  reasonRequired?: boolean;
  reasonLabel?: string;
};
export type StatItem = {
  label: string;
  value: number;
  total: number;
  color: string;
  icon: Glyph["glyph"];
  iconClass: string;
  description: string;
};

export type OtpInputProps = {
  value: string;
  onChange: (otp: string) => void;
  length?: number;
  disabled?: boolean;
}

export type UseCountdownReturn = {
  timeLeft: number;
  isExpired: boolean;
  formattedTime: string;
  startCountdown: () => void;
  stopCountdown: () => void;
  resetCountdown: () => void;
}