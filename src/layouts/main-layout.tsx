import { ReactElement } from "react";
import Header from "../components/common/header";
import Footer from "../components/common/footer";

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
