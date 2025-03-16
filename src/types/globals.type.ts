export type Theme = "light" | "dark";

export type Option = {
  value: string;
  label: string;
};

export type TabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
};
