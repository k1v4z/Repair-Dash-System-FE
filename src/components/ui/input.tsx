import * as React from "react";
import Icon from "@/components/icons";
import { cn } from "@/lib/utils";
import { glyphs } from "@/components/icons/glyphs";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: keyof typeof glyphs;
  startComponent?: React.ReactNode;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, startComponent, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <div className="relative w-full">
          <input
            type={type}
            className={cn(
              "flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "md:text-sm",
              startIcon && "pl-10",
              error && "border-red-500 focus-visible:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {startIcon && (
            <Icon
              glyph={startIcon}
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400",
                error && "text-red-500"
              )}
            />
          )}
          {startComponent && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {startComponent}
            </div>
          )}
        </div>
        {helperText && (
          <p className="mt-2 text-xs text-red-500 absolute bottom-[-20px] left-0 w-full">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };