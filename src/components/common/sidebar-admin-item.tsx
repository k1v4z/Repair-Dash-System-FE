import { NavLink } from "react-router-dom";
import Icons from "../icons";
import type { Icons as IconsType } from "../icons/icons.type";
import { cn } from "@/lib/utils";

interface SidebarAdminItemProps {
  icon: IconsType["glyph"];
  label: string;
  href: string;
  isOpen?: boolean;
}

const SidebarAdminItem = ({
  icon,
  label,
  href,
  isOpen,
}: SidebarAdminItemProps) => {
  return (
    <div className={cn("relative", isOpen ? "px-0" : "px-5")}>
      <NavLink
        to={href}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 group hover:bg-primary hover:text-white ",
            isActive
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-sidebar-foreground",
            isOpen && "justify-center"
          )
        }
      >
        {({ isActive }) => (
          <>
            <Icons
              glyph={icon}
              className={cn(
                "size-5",
                isActive
                  ? "text-primary-foreground"
                  : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
              )}
            />
            <span className={cn(isOpen && "hidden")}>{label}</span>
            {isActive && (
              <div
                className={cn(
                  "h-full w-1 rounded-r-md bg-primary absolute left-0 top-0",
                  isOpen && "hidden"
                )}
              ></div>
            )}
          </>
        )}
      </NavLink>
    </div>
  );
};

export default SidebarAdminItem;
