import { ReactElement } from "react";
import Sideleft from "@/components/common/sideleft";

const AuthLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-primary-lightBlue">
        <div className="flex sm:w-[500px] md:w-[800px] lg:w-[1200px] mx-auto bg-primary-midnightCharcoal rounded-xl overflow-hidden shadow-md">
          <Sideleft />
          <div className="flex-1 bg-white"> {children}</div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
