import { Link, useLocation } from "react-router-dom";
import routePath from "@/config/route";

const SelectForm = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex gap-4">
        <Link
          to={routePath.signup.replace(":role", "customer")}
          className={`px-4 py-2 rounded-lg border transition ${
            location.pathname === routePath.signup.replace(":role", "customer")
              ? "bg-primary-royalBlue text-white"
              : "bg-gray-200"
          }`}
        >
          Khách hàng
        </Link>
        <Link
          to={routePath.signup.replace(":role", "store")}
          className={`px-4 py-2 rounded-lg border transition ${
            location.pathname === routePath.signup.replace(":role", "store")
              ? "bg-primary-royalBlue text-white"
              : "bg-gray-200"
          }`}
        >
          Cửa hàng
        </Link>
      </div>
    </div>
  );
};

export default SelectForm;
