import { useState } from "react";
import { motion } from "framer-motion";
import type { SearchServiceItem } from "@/features/service/types/search.type";
import { mockServices } from "./_components/mock-data";
import SearchFilters from "./_components/search-filters";
import ServiceResults from "./_components/service-results";

const ServiceSearchPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages] = useState(5);
  const [services] = useState<SearchServiceItem[]>(mockServices);

  const handleSearch = () => {};

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
        <SearchFilters onSearch={handleSearch} />
      </motion.div>
      <div className="flex justify-between items-center mb-5">
        <div className="text-lg font-medium">
          {services.length > 0 ? (
            <span>{services.length} dịch vụ được tìm thấy</span>
          ) : (
            <span>Không tìm thấy dịch vụ nào</span>
          )}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ServiceResults
          services={services}
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </motion.div>
    </div>
  );
};

export default ServiceSearchPage;
