import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import type { SearchServiceParams } from "@/features/service/types/search.type";
import SearchFilters from "./_components/search-filters";
import ServiceResults from "./_components/service-results";
import { useServiceSearch } from "@/features/service/hooks/useServiceSearch";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icons";

const ServiceSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    searchResults: services,
    totalPages,
    currentPage,
    isLoading,
    error,
    searchServices,
    searchParamsToUrl,
    buildSearchParamsFromUrl,
    hasSearched,
    searchParams,
  } = useServiceSearch();

  // Handle case when user search completely but refresh page don't miss data
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.size > 0) {
      const params = buildSearchParamsFromUrl(urlParams);
      searchServices(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSearch = async (params: SearchServiceParams) => {
    // Create a new params object that preserves the current page index
    // if it exists, otherwise use the provided index or default to 1
    const searchParamsWithCurrentPage = {
      ...params,
      // If we're already on a page, use that page index unless a specific index was provided
      index: params.index || currentPage || 1,
    };

    const urlParams = searchParamsToUrl(searchParamsWithCurrentPage);
    const urlString = urlParams.toString();

    // Update URL with search parameters
    navigate(`/services/search?${urlString}`);

    // Perform the search
    await searchServices(searchParamsWithCurrentPage);
  };

  const handlePageChange = async (newPage: number) => {
    const newParams = {
      ...searchParams,
      index: newPage,
    };

    const urlParams = searchParamsToUrl(newParams);
    const urlString = urlParams.toString();

    // Update URL with new page index
    navigate(`/services/search?${urlString}`);

    // Re-fetch with new page index
    await searchServices(newParams);
  };

  const renderResultsStatus = useMemo(() => {
    if (isLoading) {
      return (
        <span className="flex items-center">
          <Icon glyph="loader" className="mr-2 h-4 w-4 animate-spin" />
          Đang tìm kiếm...
        </span>
      );
    }

    if (error) {
      return <span className="text-red-500">Có lỗi xảy ra khi tìm kiếm</span>;
    }

    if (services.length > 0) {
      return <span>{services.length} dịch vụ được tìm thấy</span>;
    }

    if (hasSearched) {
      return <span>Không tìm thấy dịch vụ nào</span>;
    }

    return <span>Tìm kiếm dịch vụ</span>;
  }, [isLoading, error, services, hasSearched]);

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-blue-500"
      >
        Tìm kiếm dịch vụ
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <SearchFilters onSearch={handleSearch} currentPage={currentPage} />
      </motion.div>
      <div className="flex justify-between items-center mb-5">
        <div className="text-lg font-medium">{renderResultsStatus}</div>
        {error && (
          <Button
            variant="outline"
            onClick={() => searchServices(searchParams)}
          >
            Thử lại
          </Button>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ServiceResults
          services={services}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </motion.div>
    </div>
  );
};

export default ServiceSearchPage;
