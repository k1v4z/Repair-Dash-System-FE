import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
// import { Avatar } from "@/components/ui/avatar";
import Icons from "@/components/icons";
import { Button } from "../ui/button";
import routePath from "@/config/route";

interface HeaderAdminProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderAdmin = ({ isOpen, setIsOpen }: HeaderAdminProps) => {
  const navigate = useNavigate();
  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-64 h-[70px] bg-white border-b z-10 transition-all duration-300",
        isOpen ? "left-16" : "left-64"
      )}
    >
      <div className="h-full px-6 flex items-center ">
        <div className="flex items-center gap-6 flex-1 justify-between">
          <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <Icons glyph="menu" className="size-6" />
          </div>
        </div>

        <div className="ml-auto flex items-center flex-1 justify-end">
          {/* <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border border-border">
              <img
                src="https://images.unsplash.com/photo-1741017638661-dab7a153f925?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="avatar"
                width={32}
                height={32}
                className="object-cover"
              />
            </Avatar>
            <div className="hidden md:block">
              <div className="text-sm font-medium">Moni Roy</div>
              <div className="text-xs text-muted-foreground">Admin</div>
            </div>
          </div> */}
          <Button
            onClick={() => navigate(routePath.home)}
            className="flex gap-1"
          >
            <p> Quay lại trang chủ</p>
            <Icons glyph="arrow" className="w-4 h-4 mt-[2px] -rotate-90" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
