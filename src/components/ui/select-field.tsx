import Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { glyphs } from "@/components/icons/glyphs";

export type SelectOption =
  | string
  | {
      value: string;
      label: string;
    };

interface SelectFieldProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
  triggerIcon?: keyof typeof glyphs;
  placeholder?: string;
  width?: string;
}

export function SelectField({
  value,
  options,
  onChange,
  className,
  triggerIcon = "calendar",
  placeholder = "Select option",
  width = "w-[140px]",
}: SelectFieldProps) {
  const getOptionLabel = (option: SelectOption) => {
    return typeof option === "string" ? option : option.label;
  };

  const getOptionValue = (option: SelectOption) => {
    return typeof option === "string" ? option : option.value;
  };

  const getCurrentLabel = () => {
    const currentOption = options.find((opt) => getOptionValue(opt) === value);
    return currentOption ? getOptionLabel(currentOption) : placeholder;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            width,
            "flex items-center gap-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50/50 rounded-lg",
            className
          )}
        >
          {triggerIcon && (
            <div className="flex items-center gap-1 ">
              <Icon glyph={triggerIcon} className="h-5 w-5" />
            </div>
          )}
          <span className="font-medium">{getCurrentLabel()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          width,
          "bg-white mt-1 p-1 border border-gray-200 rounded-md shadow-lg"
        )}
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={getOptionValue(option)}
            onClick={() => onChange(getOptionValue(option))}
            className="cursor-pointer rounded-sm px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            {getOptionLabel(option)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
