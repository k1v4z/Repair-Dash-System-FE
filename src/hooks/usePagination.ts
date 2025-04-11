import { useMemo } from "react";

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
}

interface UsePaginationReturn {
  pageNumbers: (number | string)[];
  canGoPrevious: boolean;
  canGoNext: boolean;
}

/**
 * A custom hook that manages pagination logic
 * @param currentPage - The current active page (1-based)
 * @param totalPages - The total number of pages
 * @returns An object containing page numbers to display and navigation state
 */
export const usePagination = ({
  currentPage,
  totalPages,
}: UsePaginationProps): UsePaginationReturn => {
  // Calculate which page numbers to show
  const pageNumbers = useMemo(() => {
    if (!totalPages || totalPages <= 0) return [];

    const result = [];
    const maxVisiblePages = 7;
    const edgePageCount = 1; // Always show this many pages at the beginning and end
    const middlePageCount = 3; // Show this many pages around the current page

    // Case 1: No ellipsis needed, show all pages
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
      return result;
    }

    // Case 2: Show ellipsis - add first pages
    for (let i = 1; i <= edgePageCount; i++) {
      result.push(i);
    }

    // Add ellipsis and middle pages based on position
    const leftBoundary = edgePageCount + 1;
    const rightBoundary = totalPages - edgePageCount;

    // Case 3: Current page is near the start
    if (currentPage < leftBoundary + middlePageCount) {
      for (
        let i = leftBoundary;
        i <= Math.min(rightBoundary - 1, leftBoundary + middlePageCount + 1);
        i++
      ) {
        result.push(i);
      }
      result.push("...");
    }
    // Case 4: Current page is near the end
    else if (currentPage > rightBoundary - middlePageCount) {
      result.push("...");
      for (
        let i = Math.max(leftBoundary + 1, rightBoundary - middlePageCount - 1);
        i <= rightBoundary;
        i++
      ) {
        result.push(i);
      }
    }
    // Case 5: Current page is in the middle
    else {
      result.push("...");
      for (
        let i = Math.max(
          leftBoundary,
          currentPage - Math.floor(middlePageCount / 2)
        );
        i <=
        Math.min(rightBoundary, currentPage + Math.floor(middlePageCount / 2));
        i++
      ) {
        result.push(i);
      }
      result.push("...");
    }

    // Add last pages
    for (let i = totalPages - edgePageCount + 1; i <= totalPages; i++) {
      result.push(i);
    }

    return result;
  }, [currentPage, totalPages]);

  // Determine if previous/next buttons should be enabled
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return {
    pageNumbers,
    canGoPrevious,
    canGoNext,
  };
};

export default usePagination;
