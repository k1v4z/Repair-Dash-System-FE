import { ReactElement } from "react";
import Sideleft from "@/components/common/sideleft";

const AuthLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-screen flex justify-center items-center bg-primary-deepCharcoal">
      <div className="flex md:w-[800px] lg:w-[1200px] mx-auto  bg-primary-midnightCharcoal rounded-3xl overflow-hidden">
        <Sideleft />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
