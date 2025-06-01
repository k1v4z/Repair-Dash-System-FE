import { useState, useEffect } from "react";
import type { ServiceFavorite } from "../types/service-favorite.type";
import serviceFavoriteServices from "../service/service-favorite";
const useServiceFavorite = () => {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<ServiceFavorite[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchServiceFavorite();
  }, []);

  const fetchServiceFavorite = async () => {
    try {
      setLoading(true);
      const response = await serviceFavoriteServices.getServiceFavorite();
      setFavorites(response.favorites);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    favorites,
    errorMessage,
    fetchServiceFavorite,
  };
};

export default useServiceFavorite;
