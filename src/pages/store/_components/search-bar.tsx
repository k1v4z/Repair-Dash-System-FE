import OptionsDropdown from "./options-dropdown";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4">
      <OptionsDropdown />
      <Input
        type="text"
        placeholder="Tìm kiếm dịch vụ"
        startIcon="search"
        className="text-xs xs:text-sm sm:text-base py-1.5 xs:py-2 sm:py-3"
      />
    </div>
  );
}
