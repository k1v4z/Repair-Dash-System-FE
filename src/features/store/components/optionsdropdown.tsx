import { useState } from "react";

import { Button } from "@/components/ui/button"
import { FILTER_OPTIONS, FILTER_TYPES } from "../constants/filter"
import { FilterSelect } from "@/components/common/filterselect";
import type { FilterOption } from "../types/store.type";
import Icon from "@/components/icons";

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
  const [startIndex, setStartIndex] = useState(0);

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

  // Tính toán số lượng items có thể hiển thị dựa trên độ rộng container
  const visibleItems = filteredOptions.length;

  const handleSelect = (value: string, index: number) => {
    setCurrentIndex(startIndex + index);
    onFilterChange({ type: selectedType, value });
  };

  const handleScrollLeft = () => {
    if (startIndex < visibleItems - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleScrollRight = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
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

      <div className="relative mt-2 xs:mt-3 sm:mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleScrollLeft}
          disabled={startIndex >= visibleItems - 1}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
        >
          <Icon glyph="chevron" />
        </Button>

        <div className="px-6 xs:px-8 sm:px-10" style={{ width: '100%' }}>
          <div className="flex gap-2 xs:gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
            {filteredOptions.map((option, index) => (
              <Button
                key={option.id}
                variant={startIndex + index === currentIndex ? "default" : "secondary"}
                onClick={() => handleSelect(option.name, index)}
                className={`flex-shrink-0 whitespace-nowrap text-xs xs:text-sm ${
                  startIndex + index === currentIndex 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : ""
                }`}
              >
                {option.name}
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleScrollRight}
          disabled={startIndex <= 0}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
        >
          <Icon glyph="chevron" className="rotate-180" />
        </Button>
      </div>
    </div>
  );
}
