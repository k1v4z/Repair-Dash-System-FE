import { useState, useEffect } from "react";
import type { UserAddress } from "@/types/service";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import useFavorite from "@/features/service/hooks/useFavorite";
interface StoreInformationProps {
  store: UserAddress;
}

const StoreInformation = ({ store }: StoreInformationProps) => {
  const [favoriteId, setFavoriteId] = useState<null | -1 | number>(null);

  useEffect(() => {
    if (store.favorite_id !== undefined) {
      setFavoriteId(store.favorite_id);
    }
  }, [store.favorite_id]);

  const { toggleFavorite } = useFavorite({
    storeId: store.user_id,
    favorite: favoriteId,
    onChange: (newFavorite) => {
      setFavoriteId(newFavorite);
    },
  });

  return (
    <div className="flex-1">
      <div className="h-full border rounded-lg shadow p-6 bg-white">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary-royalBlue">
            Thông tin cửa hàng
          </h2>
          <div className="cursor-pointer" onClick={toggleFavorite}>
            <Icons
              glyph="bookMark"
              className={cn(
                "size-7",
                typeof favoriteId === "number" && favoriteId > 0
                  ? "fill-yellow-500 stroke-yellow-500"
                  : "fill-none stroke-gray-400"
              )}
            />
          </div>
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
