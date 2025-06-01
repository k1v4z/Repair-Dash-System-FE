import { Button } from "@/components/ui/button";
import Icon from "@/components/icons";
import usePagination from "@/hooks/usePagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * A reusable pagination component with ellipsis for many pages
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) => {
  const { pageNumbers, canGoPrevious, canGoNext } = usePagination({
    currentPage,
    totalPages,
  });

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  return (
    <nav
      aria-label="Pagination"
      className={`flex justify-end mt-8 ${className}`}
    >
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1 h-8 text-gray-600"
          disabled={!canGoPrevious}
          onClick={() => handlePageClick(currentPage - 1)}
          aria-label="Previous page"
        >
          <Icon glyph="chevron" className="w-4 h-4 rotate-120" />
        </Button>
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-1"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <Button
              key={`page-${pageNumber}`}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="sm"
              className={`px-3 py-1 h-8 ${
                currentPage === pageNumber
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
              onClick={() =>
                typeof pageNumber === "number" && handlePageClick(pageNumber)
              }
              aria-label={`Page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </Button>
          )
        )}
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1 h-8 text-gray-600"
          disabled={!canGoNext}
          onClick={() => handlePageClick(currentPage + 1)}
          aria-label="Next page"
        >
          <Icon glyph="chevron" className="w-4 h-4 rotate-180" />
        </Button>
      </div>
    </nav>
  );
};

export default Pagination;
