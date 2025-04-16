import { useState } from "react";
import HeaderAdmin from "@/components/common/header-admin";
import SidebarAdmin from "@/components/common/sidebar-admin";
import { cn } from "@/lib/utils";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <SidebarAdmin isOpen={isOpen} />
      <div className="flex-1">
        <HeaderAdmin isOpen={isOpen} setIsOpen={setIsOpen} />
        <main
          className={cn(
            "bg-[#F5F6FA] h-[calc(100%-70px)] p-10 mt-[70px] transition-all duration-150",
            isOpen ? "ml-16" : "ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
