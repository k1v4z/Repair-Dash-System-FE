import { useState } from "react";
import { Button } from "@/components/ui/button"
import { FILTER_OPTIONS, FILTER_TYPES } from "../constants/filter"
import { FilterSelect } from "@/components/common/filterselect";
import type { FilterOption } from "../types/store.type";

interface OptionsDropdownProps {
  options?: FilterOption[];
  onFilterChange?: (filter: { type: string; value: string; }) => void;
}

export default function OptionsDropdown({
  options = Object.values(FILTER_OPTIONS).flat(),
  onFilterChange = () => {},
}: OptionsDropdownProps) {
  const [selectedType, setSelectedType] = useState('Địa điểm');
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredOptions = options.filter((option) => {
    switch (selectedType) {
      case 'Địa điểm':
        return option.type === 'location';
      case 'Giá tiền':
        return option.type === 'price';
      case 'Đánh giá':
        return option.type === 'rating';
      default:
        return false;
    }
  });

  const handleSelect = (value: string, index: number) => {
    setCurrentIndex(index);
    onFilterChange({ type: selectedType, value });
  };

  return (
    <div className="w-full">
      <FilterSelect
        value={selectedType}
        options={FILTER_TYPES as unknown as string[]}
        onChange={(value) => {
          setSelectedType(value);
          setCurrentIndex(0);
        }}
      />

      <div className="mt-2 xs:mt-3 sm:mt-4">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
      <div className="flex gap-2 xs:gap-2 sm:gap-3 pb-2">
            {filteredOptions.map((option, index) => (
              <Button
                key={option.id}
                variant={index === currentIndex ? "default" : "secondary"}
                onClick={() => handleSelect(option.name, index)}
                className={`flex-shrink-0 whitespace-nowrap text-xs xs:text-sm ${
                  index === currentIndex 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : ""
                }`}
              >
                {option.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
