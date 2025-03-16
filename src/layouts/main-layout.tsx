import { ReactElement } from "react";
import Header from "../components/common/header";
import Footer from "../components/common/footer";

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="mt-16 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
