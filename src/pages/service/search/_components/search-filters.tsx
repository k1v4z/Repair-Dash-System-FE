import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelectLocation } from "@/hooks/useSelectLocation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/icons";
import SelectField from "@/components/common/select-field";
import type { SearchServiceParams } from "@/features/service/types/search.type";
import { processFilterParams } from "@/utils/params";
import { FILTER_PARAMS_LIST } from "@/features/service/constants/filterParamsList";

interface SearchFiltersProps {
  onSearch: (params: SearchServiceParams) => Promise<void>;
  currentPage?: number;
}

const SearchFilters = ({ onSearch, currentPage = 1 }: SearchFiltersProps) => {
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [street, setStreet] = useState("");
  const index = currentPage;

  const {
    selectedProvince,
    selectedDistrict,
    selectedWard,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
    provinces,
    districts,
    wards,
  } = useSelectLocation();

  // Initialize form state from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const filterParams = processFilterParams(FILTER_PARAMS_LIST, urlParams);

    if (filterParams["keyword"]) setKeyword(filterParams["keyword"]);
    if (filterParams["city"]) {
      handleProvinceChange(filterParams["city"]);
      handleDistrictChange("");
      handleWardChange("");
    }
    if (filterParams["district"]) {
      handleDistrictChange(filterParams["district"]);
      handleWardChange("");
    }
    if (filterParams["ward"]) {
      handleWardChange(filterParams["ward"]);
    }
    if (filterParams["street"]) setStreet(filterParams["street"]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleSearch = () => {
    const searchParams: SearchServiceParams = {
      keyword: keyword.trim(),
      user_city: selectedProvince,
      user_district: selectedDistrict,
      user_ward: selectedWard,
      user_street: street.trim(),
      index, // Preserve the current page index
    };

    // Remove empty params
    Object.keys(searchParams).forEach((key) => {
      if (!searchParams[key as keyof SearchServiceParams]) {
        delete searchParams[key as keyof SearchServiceParams];
      }
    });

    onSearch(searchParams);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card className="p-6 shadow-md rounded-xl">
      <div className="space-y-4">
        <div>
          <label htmlFor="keyword" className="block text-sm font-medium mb-1">
            Tìm kiếm
          </label>
          <div className="relative">
            <Input
              id="keyword"
              placeholder="Nhập tên dịch vụ hoặc cửa hàng"
              className="pl-10 h-[45.33px]"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Icon
              glyph="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[150px]">
              <SelectField
                value={selectedProvince}
                onValueChange={handleProvinceChange}
                options={provinces}
                placeholder="Tỉnh / Thành phố"
                triggerClassName="w-full"
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <SelectField
                value={selectedDistrict}
                onValueChange={handleDistrictChange}
                options={districts}
                placeholder="Quận / Huyện"
                triggerClassName="w-full"
                disabled={!selectedProvince}
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <SelectField
                value={selectedWard}
                onValueChange={handleWardChange}
                options={wards}
                placeholder="Phường / Xã"
                triggerClassName="w-full"
                disabled={!selectedDistrict}
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <Input
                id="street"
                placeholder="Đường"
                className="w-full h-[45.33px]"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button
              className="h-[45.33px] min-w-[100px] whitespace-nowrap rounded-full"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SearchFilters;
