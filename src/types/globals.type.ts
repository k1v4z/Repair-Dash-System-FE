import { ColumnDef } from "@tanstack/react-table"

export type Theme = "light" | "dark";

export type Option = {
  value: string;
  label: string;
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

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  loading?: boolean
  pageSize?: number
}
