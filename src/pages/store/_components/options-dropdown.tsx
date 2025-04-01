import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FILTER_OPTIONS, FILTER_CATEGORIES } from "../constants/filter";
import type { FilterOption } from "@/features/store/types/store.type";
import Icon from "@/components/icons";
import SelectField from "@/components/common/select-field";

interface OptionsDropdownProps {
  options?: FilterOption[];
  onFilterChange?: (filter: { type: string; value: string }) => void;
}

const FILTER_OPTIONS_CONVERTED = Object.values(FILTER_OPTIONS).flat();

export default function OptionsDropdown({
  options = FILTER_OPTIONS_CONVERTED,
  onFilterChange = () => {},
}: OptionsDropdownProps) {
  const [selectedType, setSelectedType] = useState(FILTER_CATEGORIES[0].value);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const filteredOptions = options.filter((option) => {
    switch (selectedType) {
      case "location":
        return option.type === "location";
      case "price":
        return option.type === "price";
      case "rating":
        return option.type === "rating";
      default:
        return false;
    }
  });

  // Tính toán số lượng items có thể hiển thị dựa trên độ rộng container
  const visibleItems = filteredOptions.length;

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

  const handleSelect = (value: string, index: number) => {
    setCurrentIndex(index);
    onFilterChange({ type: selectedType, value });
  };

  return (
    <div className="w-full">
      <SelectField
        value={selectedType}
        options={FILTER_CATEGORIES}
        onValueChange={(value: string) => {
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
        <div className="px-6 xs:px-8 sm:px-10" style={{ width: "100%" }}>
          <div className="flex gap-2 xs:gap-2 sm:gap-3 overflow-x-scroll">
            {filteredOptions.map((option, index) => (
              <Button
                key={option.id}
                variant={
                  startIndex + index === currentIndex ? "default" : "secondary"
                }
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
