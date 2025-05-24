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
