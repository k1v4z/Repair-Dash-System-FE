import { forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextareaFieldProps
  extends React.ComponentPropsWithoutRef<typeof Textarea> {
  helperText?: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ className, helperText, ...props }, ref) => {
    return (
      <div className="relative">
        <Textarea
          ref={ref}
          className={cn(
            "text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md",
            className
          )}
          {...props}
        />
        <div className="absolute bottom-[-20px] left-0 w-full">
          {helperText && (
            <p className="mt-1 text-xs text-red-500">{helperText}</p>
          )}
        </div>
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";

export default TextareaField;
