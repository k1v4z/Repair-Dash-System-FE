export type FilterType = 'location' | 'price' | 'rating';

export interface FilterOption {
  id: string;
  name: string;
  type: FilterType;
  value?: number;
}

export interface FilterSelectProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
} 