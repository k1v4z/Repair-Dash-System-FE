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
  options: Option[] | string[];
  triggerClassName?: string;
  helperText?: string;
  renderOption?: (option: Option | string) => React.ReactNode;
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
      renderOption,
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
              "w-full h-[45.33px] rounded-lg border bg-white shadow-md focus:ring-0 [&>svg]:transition-transform [&>svg]:duration-200 [&[data-state=open]>svg]:rotate-180",
              triggerClassName
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={typeof option === "string" ? option : option.value}
                value={typeof option === "string" ? option : option.value}
                className="cursor-pointer"
              >
                {renderOption
                  ? renderOption(option)
                  : typeof option === "string"
                  ? option
                  : option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {helperText && (
          <p className="mt-1 text-xs text-red-500 absolute bottom-[-20px] left-0 w-full">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
