import { useState } from 'react';
import SearchBar from '@/features/store/components/searchbar';
import ServiceCard from '@/features/store/components/servicecard';

const services = [
  {
    id: 1,
    image: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/352057212_3369503110046479_7431561629574466753_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHqUdiQ3dIzpijqWMch7Q78WvwI-a42FhJa_Aj5rjYWEoP88-KtLn1cBDQmB7-qC8SVh-1BQu-5hBJl1BjN-rnq&_nc_ohc=cgjPxOl8DbYQ7kNvgG_35H1&_nc_oc=Adjj35sSVoy92pKFg3hTu8xQXivgEZED5XsWfMGn3wQTdfN-2jTXDAKS8QViuozS-2k&_nc_zt=24&_nc_ht=scontent.fdad3-4.fna&_nc_gid=ALK5Wirf73L8XnF2gcQAoZJ&oh=00_AYEKZ9HHDgMhL00ftXb-mCfXzcfVhsPs87x2xGgqu6n0Gg&oe=67D2F5AF',
    title: 'Sửa chữa điện thoại tại nhà',
    company: 'CÔNG TY TNHH ĐIỆN TỬ ABC',
    location: 'Hà Nội',
    price: '200.000đ',
  },
  {
    id: 2,
    image: '/images/service2.jpg',
    title: 'Sửa chữa điện thoại tại nhà',
    company: 'CÔNG TY TNHH ĐIỆN TỬ ABC',
    location: 'Hà Nội',
    price: '200.000đ',
  },
  {
    id: 3,
    image: '/images/service3.jpg',
    title: 'Sửa chữa điện thoại tại nhà',
    company: 'CÔNG TY TNHH ĐIỆN TỬ ABC',
    location: 'Hà Nội',
    price: '200.000đ',
  },
  {
    id: 4,
    image: '/images/service4.jpg',
    title: 'Sửa chữa điện thoại tại nhà',
    company: 'CÔNG TY TNHH ĐIỆN TỬ ABC',
    location: 'Hà Nội',
    price: '200.000đ',
  },
  {
    id: 5,
    image: '/images/service5.jpg',
    title: 'Sửa chữa điện thoại tại nhà',
    company: 'CÔNG TY TNHH ĐIỆN TỬ ABC',
    location: 'Hà Nội',
    price: '200.000đ',
  },
  {
    id: 6,
    image: '/images/service6.jpg',
    title: 'Sửa chữa điện thoại tại nhà',
    company: 'CÔNG TY TNHH ĐIỆN TỬ ABC',
    location: 'Hà Nội',
    price: '200.000đ',
  },
  
];

export default function StorePage() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="container justify-center items-center flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <SearchBar />
     
        <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {services.map(service => (
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
