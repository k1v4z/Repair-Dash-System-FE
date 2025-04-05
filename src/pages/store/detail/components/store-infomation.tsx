import type { UserAddress } from "@/types/service";
import Icons from "@/components/icons";

interface StoreInformationProps {
  store: UserAddress;
}

const StoreInformation = ({ store }: StoreInformationProps) => {
  return (
    <div className="flex-1">
      <div className="h-full border rounded-lg shadow p-6 bg-white">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary-royalBlue">
            Thông tin cửa hàng
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-500">Tên cửa hàng</p>
            <div className="flex items-center gap-2">
              <Icons glyph="store" className="size-5 fill-blue-600 mt-1" />
              <span className="font-medium">{store.user_full_name}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-500">Địa chỉ</p>
            <div className="flex items-center gap-2">
              <Icons glyph="location" className="w-5 h-5 text-blue-600 mt-1" />
              <span className="font-medium">
                {`${store.user_street}, ${store.user_ward}, ${store.user_district}, ${store.user_city}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInformation;
