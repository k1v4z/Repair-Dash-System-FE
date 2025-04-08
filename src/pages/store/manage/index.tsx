import type { TabItem } from "@/types/globals.type";
import { ServiceManagement } from "./_components/manage-services";
import { FeedbackManagement } from "./_components/manage-feedback";
import { EmployeeManagement } from "./_components/manage-employee";
import { TabNavigation } from "./_components/tab-navigation";

const TABS: TabItem[] = [
  {
    value: "services",
    label: "Dịch vụ",
    content: <ServiceManagement />,
  },
  {
    value: "feedback",
    label: "Phản hồi",
    content: <FeedbackManagement />,
  },
  {
    value: "employees",
    label: "Nhân viên",
    content: <EmployeeManagement />,
  },
];

export default function ManageStorePage() {
  return (
    <div className="container py-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-3 text-gray-900">Quản lý cửa hàng</h1>
        <p className="text-gray-500 text-sm max-w-2xl">
          Quản lý dịch vụ, phản hồi và nhân viên của cửa hàng. Dễ dàng thêm, sửa, xóa và theo dõi 
          thông tin quan trọng.
        </p>
      </div>
      
      <TabNavigation 
        tabs={TABS} 
        defaultTab="services"
      />
    </div>
  );
}
