import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterSelectProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

export function FilterSelect({
  label = "Lọc theo:",
  value,
  options,
  onChange,
  className = "w-full xs:w-[180px]",
}: FilterSelectProps) {
  return (
    <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2">
      <span className="text-xs xs:text-sm sm:text-base text-gray-600 font-semibold">
        {label}
      </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={className}>
          <SelectValue>{value}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
