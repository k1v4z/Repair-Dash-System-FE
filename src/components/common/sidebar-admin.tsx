import SidebarItem from "./sidebar-admin-item";
import routePath from "@/config/route";
import { cn } from "@/lib/utils";
import type { Glyph } from "../icons/glyphs";
import Icons from "../icons";
import { useAuth } from "@/features/auth/hooks/useAuth";

const SIDEBAR_ITEMS: {
  icon: Glyph["glyph"];
  label: string;
  href: string;
}[] = [
  {
    icon: "manageUser",
    label: "Quản lý người dùng",
    href: routePath.manageUser,
  },
  {
    icon: "manageFeedback",
    label: "Danh sách phản hồi",
    href: routePath.manageReport,
  },
];

function SidebarAdmin({ isOpen }: { isOpen: boolean }) {
  const { logout } = useAuth();
  return (
    <aside
      className={cn(
        "fixed top-0 w-64 h-screen border-r border-border flex flex-col bg-white z-10 transition-all duration-300",
        isOpen ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex h-[70px] items-center gap-2 px-6 border-b border-border overflow-hidden"
        )}
      >
        {!isOpen && (
          <span className="text-xl font-bold tracking-tight text-primary ">
            ADMIN
          </span>
        )}
      </div>

      <div
        className={cn(
          "flex-1 overflow-y-auto scrollbar-hide flex flex-col",
          isOpen && "px-2"
        )}
      >
        <div className="flex flex-col flex-1">
          <div className="flex-1 border-b border-[#E0E0E0] space-y-1 py-4 ">
            {SIDEBAR_ITEMS.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isOpen={isOpen}
              />
            ))}
          </div>
        </div>

        {/* Logout */}
        <div
          className={cn(
            "relative py-2 cursor-pointer",
            isOpen ? "px-0" : "px-5"
          )}
          onClick={() => logout()}
        >
          <div
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-100 group hover:bg-primary hover:text-white ",

              isOpen && "justify-center"
            )}
          >
            <Icons
              glyph="logout"
              className={cn(
                "size-5 text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
              )}
            />
            <span className={cn(isOpen && "hidden")}>Đăng xuất</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SidebarAdmin;
