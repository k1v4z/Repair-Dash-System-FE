import ServiceFavoriteItem from "./_components/service-favorite-item";
import useServiceFavorite from "@/features/service/hooks/useServiceFavorite";
import { useState } from "react";
import SelectField from "@/components/common/select-field";

const ServiceFavorite = () => {
  const { favorites, fetchServiceFavorite } = useServiceFavorite();
  const [filter, setFilter] = useState<"all" | "store" | "service">("all");

  const filteredFavorites = favorites.filter((favorite) => {
    if (filter === "all") return true;
    if (filter === "store") return favorite.is_store;
    if (filter === "service") return !favorite.is_store;
  });

  return (
    <div className="max-w-7xl mt-5 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-primary-royalBlue text-center">
        Dịch vụ và cửa hàng yêu thích
      </h1>

      <div className="mb-4 flex justify-end">
        <SelectField
          value={filter}
          onValueChange={(value) =>
            setFilter(value as "all" | "store" | "service")
          }
          options={[
            { value: "all", label: "Tất cả" },
            { value: "store", label: "Cửa hàng" },
            { value: "service", label: "Dịch vụ" },
          ]}
          placeholder="Chọn loại"
          triggerClassName="w-[180px] bg-white border-2 border-primary-royalBlue/20 hover:border-primary-royalBlue/40 focus:border-primary-royalBlue/60 focus:ring-1 focus:ring-primary-royalBlue/20 transition-colors"
        />
      </div>
      <div className="space-y-1 rounded shadow p-6 border max-h-[570px] overflow-y-auto">
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((favorite) => {
            return (
              <ServiceFavoriteItem
                key={favorite.favorite_id}
                favorite={favorite}
                refresh={fetchServiceFavorite}
              />
            );
          })
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>Không có dữ liệu nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceFavorite;
