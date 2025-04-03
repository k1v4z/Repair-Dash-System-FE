import { ReactElement } from "react";
import Sideleft from "@/components/common/sideleft";

const AuthLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-primary-lightBlue">
        <div className="flex sm:w-[500px] md:w-[800px] lg:w-[1200px] mx-auto bg-primary-midnightCharcoal rounded-xl overflow-hidden shadow-md my-5">
          <Sideleft />
          <div className="flex-1 bg-white max-h-[90vh] overflow-hidden">
            <div className="h-full overflow-auto [&::-webkit-scrollbar]:hidden hover:[&::-webkit-scrollbar]:block">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
