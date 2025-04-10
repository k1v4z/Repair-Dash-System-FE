import { useState, useEffect } from 'react';
import { storeManageServices } from '../services/store.service';
import type { Employee, UseEmployeeReturn, UseEmployeePage} from '../types/store-manage.type';

export const useEmployee = ({ pageSize = 10 }: UseEmployeePage = {}): UseEmployeeReturn => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchEmployees = async (page: number) => {
    try {
      setIsLoading(true);
      setError(null); 
      const response = await storeManageServices.getEmployees({
        page,
        limit: pageSize,
      });
      setEmployees(response.employees);
      setTotalPages(response.total_pages);
      setCurrentPage(response.current_page);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch employees'));
    } finally {
      setIsLoading(false);
    }
  };

  const refreshEmployees = async () => {
    await fetchEmployees(currentPage);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchEmployees(page);
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  return {
    employees,
    currentPage,
    totalPages,
    isLoading,
    error,
    setCurrentPage: handlePageChange,
    refreshEmployees,
  };
}; 