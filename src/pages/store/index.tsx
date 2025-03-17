import { useState } from "react";
import SearchBar from "@/features/store/components/search-bar";
import ServiceCard from "@/features/store/components/service-card";
import { storeService } from "@/features/store/services/store.service";


export default function StorePage() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fId) => fId !== id) : [...prev, id]
    );
  };

  return (
    <div className="container justify-center items-center flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <SearchBar />
        <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
              isFavorite={favorites.includes(service.id)}
              onFavorite={() => toggleFavorite(service.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
