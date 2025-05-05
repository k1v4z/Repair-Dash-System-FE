import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  description?: string;
  color?: string;
}

const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
  return (
    <Card className={cn("shadow-md", color)}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-3xl font-bold">{value}</p>
        {icon}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
