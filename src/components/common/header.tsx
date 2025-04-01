import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Icon from "../icons";
import { Link } from "react-router-dom";

const NAVIGATION_LINKS = [
  { name: "Trang chủ", href: "#" },
  { name: "Dịch vụ", href: "#services" },
  { name: "Cửa hàng", href: "/store" },
  { name: "Bài viết", href: "#testimonials" },
  { name: "Liên hệ", href: "#contact" },
];

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      (error as Error).message = "Failed to logout";
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 top-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <span className="text-2xl font-bold text-blue-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-purple-500 hover:to-sky-400 transition-all duration-300">
            Repair Dash
          </span>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAVIGATION_LINKS.map((item) => (
                <Button key={item.name} asChild variant="link">
                  <a
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="ml-4 flex items-center">
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
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <a
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                    >
                      <Icon glyph="profile" className="size-5" />
                      <span>Hồ sơ</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a
                      href="#settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700"
                    >
                      <Icon glyph="setting" className="size-5" />
                      <span>Cài đặt</span>
                    </a>
                  </DropdownMenuItem>
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
                <Link to="/login">Đăng nhập</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
