import { useState } from "react";

const styles = {
  matchRole: "bg-primary-royalBlue text-white",
  withOutMatchRole: "bg-gray-200",
};

interface RoleSelectProps {
  onChangeRole: (role: string) => void;
}

const RoleSelect = ({ onChangeRole }: RoleSelectProps) => {
  const [role, setRole] = useState("customer");

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="flex gap-2">
        <div
          className={`px-4 py-2 rounded-lg border transition hover:cursor-pointer ${
            role === "customer" ? styles.matchRole : styles.withOutMatchRole
          }`}
          onClick={() => {
            setRole("customer");
            onChangeRole("customer");
          }}
        >
          Khách hàng
        </div>
        <div
          className={`px-4 py-2 rounded-lg border transition hover:cursor-pointer ${
            role === "store" ? styles.matchRole : styles.withOutMatchRole
          }`}
          onClick={() => {
            setRole("store");
            onChangeRole("store");
          }}
        >
          Cửa hàng
        </div>
      </div>
    </div>
  );
};

export default RoleSelect;
