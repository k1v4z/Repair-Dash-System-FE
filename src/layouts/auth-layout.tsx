import { ReactElement } from "react";
import Sideleft from "@/components/common/sideleft";

const AuthLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-screen flex justify-center items-center bg-[#2a2a36] ">
      <div className="flex tablet:w-[800px] laptop:w-[1200px] mx-auto h-[550px] bg-[#1c1c24] rounded-3xl overflow-hidden">
        <Sideleft />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
