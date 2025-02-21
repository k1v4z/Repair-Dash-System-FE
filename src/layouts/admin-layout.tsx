import { ReactElement } from "react";
import Sidebar from "../components/common/sidebar";

const AdminLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
