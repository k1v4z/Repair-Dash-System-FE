import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { EmployeeOption } from "@/features/order/types/orders.type";

interface Props {
  option: EmployeeOption;
}

const EmployeeOption = ({ option }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6">
        {option.employee_avatar_url ? (
          <AvatarImage src={option.avatar} alt={option.label} />
        ) : (
          <AvatarFallback>
            {option.label?.charAt(0).toUpperCase()}
          </AvatarFallback>
        )}
      </Avatar>
      <span>{option.label}</span>
    </div>
  );
};

export default EmployeeOption;
