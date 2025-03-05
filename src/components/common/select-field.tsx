import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Option } from "@/types/globals.type";
import { forwardRef } from "react";

interface SelectFieldProps
  extends React.ComponentPropsWithoutRef<typeof Select> {
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onValueChange: (value: string) => void;
  options: Option[];
  triggerClassName?: string;
  helperText?: string;
}

const SelectField = forwardRef<HTMLButtonElement, SelectFieldProps>(
  (props, ref) => {
    const {
      disabled = false,
      placeholder = "Select an option",
      value,
      onValueChange,
      options,
      triggerClassName,
      helperText,
      ...rest
    } = props;

    return (
      <div className="relative">
        <Select
          disabled={disabled}
          value={value}
          onValueChange={onValueChange}
          {...rest}
        >
          <SelectTrigger
            ref={ref}
            className={cn(
              "w-full h-[45.33px] rounded-lg border bg-white shadow-md focus:ring-0",
              triggerClassName
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option: Option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="absolute bottom-[-20px] left-0 w-full">
          {helperText && (
            <p className="mt-1 text-xs text-red-500">{helperText}</p>
          )}
        </div>
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
