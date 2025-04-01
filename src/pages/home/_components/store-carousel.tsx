import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { STORES } from "../constants/store";
import { Button } from "@/components/ui/button";

export default function StoreCarousel() {
  return (
    <section id="store-carousel" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Partner Stores
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover our network of trusted service providers
          </p>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {STORES.map((store) => (
              <CarouselItem
                key={store.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 h-full">
                    <div className="relative">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg">
                        ★ {store.rating}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {store.name}
                      </h3>
                      <p className="text-gray-600 flex-grow">
                        {store.description}
                      </p>
                      <Button className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="mr-4" />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
