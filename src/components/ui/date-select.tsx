import { SelectField } from "@/components/ui/select-field"
import { MONTHS } from "@/constants/date-time"

interface DateSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateSelect({ value, onChange }: DateSelectProps) {
  return (
    <SelectField
      value={value}
      options={MONTHS}
      onChange={onChange}
      triggerIcon="calendar"
    />
  )
} 