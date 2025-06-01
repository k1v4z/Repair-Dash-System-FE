import { useState } from "react";
import { toast } from "react-toastify";
import serviceFavoriteServices from "../service/service-favorite";
import type { ServiceFavoriteRequest } from "../types/service-favorite.type";
import { useNavigate } from "react-router-dom";
import routePath from "@/config/route";

interface UseFavoriteProps {
  serviceId?: number;
  storeId?: number;
  favorite: null | -1 | number;
  onChange: (newFavorite: null | -1 | number) => void;
}

const useFavorite = ({
  serviceId,
  storeId,
  favorite,
  onChange,
}: UseFavoriteProps) => {
  const [statusFavorite, setStatusFavorite] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAddFavorite = async () => {
    try {
      let request: ServiceFavoriteRequest;
      if (serviceId !== undefined) {
        request = { service_id: serviceId };
      } else if (storeId !== undefined) {
        request = { store_id: storeId };
      } else {
        throw new Error("Phải cung cấp serviceId hoặc storeId");
      }
      const response = await serviceFavoriteServices.addServiceFavorite(
        request
      );
      onChange(response.favorite_id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStatusFavorite(error.status);
      if (error.status === 400) {
        toast.error(
          "Dịch vụ này đã được thêm vào danh sách yêu thích trước đó"
        );
      } else if (error.status !== 401) {
        toast.error(
          "Không thể thêm dịch vụ vào danh sách yêu thích. Vui lòng thử lại"
        );
      }
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await serviceFavoriteServices.deleteServiceFavorite(
        favorite?.toString() ?? ""
      );
      onChange(-1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStatusFavorite(error.status);
      toast.error("Không thể xóa dịch vụ đã yêu thích. Vui lòng thử lại");
    }
  };

  const toggleFavorite = () => {
    if (favorite === null) {
      navigate(routePath.login);
      return;
    }
    if (favorite === -1) {
      handleAddFavorite();
    } else if (typeof favorite === "number" && favorite > 0) {
      handleRemoveFavorite();
    }
  };

  return {
    statusFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
