import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FEEDBACKS } from "../constants/feedback";

export default function Feedback() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Khách Hàng Nói Gì Về Chúng Tôi ?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Đọc những chia sẻ từ những khách hàng hài lòng của chúng tôi
          </p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {FEEDBACKS.map((feedback) => (
            <SwiperSlide key={feedback.id}>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={feedback.image}
                    alt={feedback.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feedback.name}
                    </h3>
                    <p className="text-gray-600">{feedback.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{feedback.content}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
