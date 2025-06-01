import { Button } from "@/components/ui/button";
import Icon from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  children: React.ReactNode;
  className?: string;
}

export function SortableHeader<TData>({
  column,
  children,
  className,
}: SortableHeaderProps<TData>) {
  const canSort = column.getCanSort();
  const sorted = column.getIsSorted();

  if (!canSort) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "h-auto p-0 font-medium text-left justify-start hover:bg-transparent hover:text-gray-700 transition-colors",
        className
      )}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      <span className="flex items-center">
        {children}
        <div className="ml-2 flex flex-col items-center">
          {sorted === "asc" && (
            <Icon glyph="arrowUp" className="h-3 w-3 text-gray-700" />
          )}
          {sorted === "desc" && (
            <Icon glyph="arrowDown" className="h-3 w-3 text-gray-700" />
          )}
          {!sorted && (
            <div className="flex flex-col items-center">
              <Icon
                glyph="arrowUp"
                className="h-3 w-3 text-gray-300 hover:text-gray-500"
              />
              <Icon
                glyph="arrowDown"
                className="h-3 w-3 text-gray-300 hover:text-gray-500 -mt-1"
              />
            </div>
          )}
        </div>
      </span>
    </Button>
  );
}
