import { motion } from "framer-motion";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { HERO_IMAGES } from "../constants/hero-image";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="h-full"
        >
          {HERO_IMAGES.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Giải Pháp Toàn Diện Cho
              <span className="text-blue-400"> Dịch Vụ Sữa Chữa Tại Nhà</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Kết nối với các chuyên gia sửa chữa cho mọi nhu cầu sửa chữa tại
              nhà. Dịch vụ chất lượng, đảm bảo sự hài lòng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Bắt Đầu Ngay
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 px-8 py-3 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors"
                onClick={() => navigate("/services/search")}
              >
                Xem Dịch Vụ
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="absolute -left-4 top-1/4 z-10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <WrenchScrewdriverIcon className="h-12 w-12 text-blue-400" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
