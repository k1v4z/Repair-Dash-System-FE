import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icons from "@/components/icons";
import useDebounce from "@/hooks/useDebounce";

interface UserFilterProps {
  onFilter: (filters: {
    identifierEmail: string;
    userFullName: string;
  }) => void;
  initialFilters?: { identifierEmail: string; userFullName: string };
}

const UserFilter = ({ onFilter, initialFilters }: UserFilterProps) => {
  const [identifierEmail, setIdentifierEmail] = useState(
    initialFilters?.identifierEmail || ""
  );
  const [userFullName, setUserFullName] = useState(
    initialFilters?.userFullName || ""
  );

  // Use the debounce hook for both values
  const debouncedEmail = useDebounce(identifierEmail);
  const debouncedName = useDebounce(userFullName);
  const [isFiltering, setIsFiltering] = useState(false);

  // Call filter function when debounced values change
  useEffect(() => {
    onFilter({ identifierEmail: debouncedEmail, userFullName: debouncedName });
    setIsFiltering(debouncedEmail.trim() !== "" || debouncedName.trim() !== "");
  }, [debouncedEmail, debouncedName, onFilter]);

  const handleReset = () => {
    setIdentifierEmail("");
    setUserFullName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ identifierEmail, userFullName });
  };

  return (
    <div
      className={`bg-white p-5 rounded-[14px] border ${
        isFiltering ? "border-blue-300 shadow-md" : "border-[#D5D5D5]"
      } mb-6`}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              placeholder="Tìm kiếm theo email"
              value={identifierEmail}
              onChange={(e) => setIdentifierEmail(e.target.value)}
              startIcon="search"
              className="h-12"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên người dùng"
              value={userFullName}
              onChange={(e) => setUserFullName(e.target.value)}
              startIcon="profile"
              className="h-12"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          {isFiltering && (
            <Button
              variant="outline"
              onClick={handleReset}
              type="button"
              className="flex items-center gap-2 h-10"
            >
              <Icons glyph="refresh" className="size-4" />
              Đặt lại bộ lọc
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserFilter;
