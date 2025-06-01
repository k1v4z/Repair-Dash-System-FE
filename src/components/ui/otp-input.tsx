import { OtpInputProps } from "@/types/globals.type";
import React, { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";

export const OtpInput = ({ value, onChange, length = 6, disabled = false }: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(value.split("").slice(0, length));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = Array(length)
      .fill(null)
      .map((_, i) => inputRefs.current[i] || null);
  }, [length]);

  useEffect(() => {
    // Update local state if value prop changes
    setOtp(value.split("").slice(0, length));
  }, [value, length]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    
    if (val === "" || /^\d$/.test(val)) { // Allow only empty or single digit
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      
      // Notify parent component
      onChange(newOtp.join(""));
      
      // Move to next input if value is added
      if (val !== "" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // If current field is empty and backspace is pressed, move to previous field
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste (e.g., pasting the entire OTP)
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    if (pastedData) {
      // Extract only digits from pasted content
      const digits = pastedData.replace(/\D/g, "").split("").slice(0, length);
      const newOtp = [...Array(length)].map((_, i) => digits[i] || "");
      
      setOtp(newOtp);
      onChange(newOtp.join(""));
      
      // Focus on the last filled input or the next empty one
      const lastFilledIndex = Math.min(digits.length, length) - 1;
      if (lastFilledIndex >= 0) {
        inputRefs.current[lastFilledIndex]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center my-4">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg border-2 rounded-lg bg-white border-gray-300 focus:outline-none focus:border-primary-royalBlue focus:ring-1 focus:ring-primary-royalBlue disabled:opacity-50"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}; 