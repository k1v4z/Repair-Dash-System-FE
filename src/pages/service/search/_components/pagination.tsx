import { Button } from "@/components/ui/button";
import Icon from "@/components/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // Helper function to determine which pages to show
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first and last page
      pageNumbers.push(1);

      // Show dots before if not showing first 3 pages
      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Show dots after if not showing last 3 pages
      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-end mt-8">
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1 h-8 text-gray-600"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Icon glyph="chevron" className="w-4 h-4 rotate-120" />
        </Button>

        {getPageNumbers().map((pageNumber, index) =>
          pageNumber === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1">
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
                typeof pageNumber === "number" && onPageChange(pageNumber)
              }
            >
              {pageNumber}
            </Button>
          )
        )}
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1 h-8 text-gray-600"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <Icon glyph="chevron" className="w-4 h-4 rotate-180" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
