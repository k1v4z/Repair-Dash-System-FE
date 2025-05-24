import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Icon from "../icons";
import routePath from "@/config/route";
import { cn } from "@/lib/utils";
import { isLinkActive } from "@/utils/headerActive";
import { useMemo } from "react";
import { useUserStore } from "@/stores/user";
import { NotificationItem } from "./notification-item";
import useNotification from "@/features/notification/hooks/useNotification";

const NAVIGATION_LINKS = [
  { name: "Trang chủ", href: "/" },
  { name: "Gói dịch vụ", href: "/subscription" },
  { name: "Cửa hàng", href: "/store" },
  { name: "Tìm kiếm", href: "/services/search" },
  { name: "Liên hệ", href: "/contact" },
];

export default function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const { notifications, unreadCount } = useNotification();
  const { reset } = useUserStore();
  const navigate = useNavigate();

  const navigationLinksConverted = useMemo(() => {
    if (user?.role !== "STORE") {
      return NAVIGATION_LINKS.filter((item) => item.name !== "Gói dịch vụ");
    }
    return NAVIGATION_LINKS;
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      reset();
    } catch (error) {
      (error as Error).message = "Failed to logout";
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 top-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-sky-400 transition-all duration-300"
          >
            Repair Dash
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationLinksConverted.map((item) => (
                <Button key={item.name} asChild variant="link">
                  <Link
                    to={{ pathname: item.href }}
                    className={cn(
                      "px-3 py-2 text-sm font-medium relative hover:no-underline",
                      isLinkActive(item.href)
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    )}
                  >
                    {item.name}
                    {isLinkActive(item.href) && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                    )}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="ml-4 flex items-center gap-2">
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative focus-visible:ring-0 focus-visible:ring-transparent"
                  >
                    <Icon glyph="bell" className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[380px]">
                  <div className="flex items-center justify-between p-2 border-b">
                    <h4 className="font-medium">Thông báo</h4>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <NotificationItem
                          key={`${notification.time}-${index}`}
                          notification={notification}
                        />
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        Không có thông báo mới
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="focus-visible:ring-0 focus-visible:ring-transparent"
                  asChild
                >
                  <Button variant="ghost" className="rounded-full">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User avatar"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-max">
                  <DropdownMenuItem>
                    <Link
                      to={routePath.profile}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                    >
                      <Icon glyph="profile" className="size-5" />
                      <span>Hồ sơ</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to={routePath.orderManagement}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                    >
                      <Icon glyph="orderList" className="size-5 fill-black" />
                      <span>Lịch sử đơn hàng</span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "STORE" && (
                    <DropdownMenuItem>
                      <Link
                        to={routePath.manageStore}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                      >
                        <Icon glyph="store" className="size-5 fill-black" />
                        <span>Quản lý cửa hàng</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => navigate(routePath.serviceFavorite)}
                  >
                    <p className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700">
                      <Icon glyph="bookMark" className="size-5 fill-black" />
                      <span>Dịch vụ yêu thích</span>
                    </p>
                  </DropdownMenuItem>

                  {user?.role === "ADMIN" && (
                    <DropdownMenuItem>
                      <Link
                        to={routePath.manageUser}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                      >
                        <Icon glyph="admin" className="size-5" />
                        <span>Quản trị viên</span>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700"
                    >
                      <Icon glyph="logout" className="size-5" />
                      <span>Đăng xuất</span>
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="bg-blue-500 hover:bg-blue-400">
                <Link to={routePath.login}>Đăng nhập</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
