import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/icons";
import SelectField from "@/components/common/select-field";
import { useState } from "react";
import { useSelectLocation } from "@/hooks/useSelectLocation";

interface SearchFiltersProps {
  onSearch: () => void;
}

const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [keyword, setKeyword] = useState("");
  const [street, setStreet] = useState("");

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

  const handleSearch = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const searchParams = {
      keyword,
      user_city: selectedProvince,
      user_district: selectedDistrict,
      user_ward: selectedWard,
      user_street: street,
    };

    onSearch();
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
