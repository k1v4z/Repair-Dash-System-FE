import { motion } from "framer-motion";
import {
  Wrench,
  Shield,
  HandshakeIcon,
  TrendingUp,
  HeadphonesIcon,
  HardHat
} from "lucide-react";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stats = [
    { number: "10K+", label: "Khách hàng", color: "bg-blue-500" },
    { number: "500+", label: "Đối tác", color: "bg-green-500" },
    { number: "98%", label: "Hài lòng", color: "bg-yellow-500" },
    { number: "24/7", label: "Hỗ trợ", color: "bg-red-500" }
  ];

  const values = [
    {
      icon: Wrench,
      title: "Chất Lượng",
      description: "Cam kết dịch vụ chất lượng cao với đội ngũ kỹ thuật viên chuyên nghiệp"
    },
    {
      icon: Shield,
      title: "Uy Tín",
      description: "Đảm bảo an toàn và bảo mật thông tin cho mọi khách hàng"
    },
    {
      icon: HandshakeIcon,
      title: "Tận Tâm",
      description: "Luôn đặt sự hài lòng của khách hàng lên hàng đầu"
    },
    {
      icon: HeadphonesIcon,
      title: "Hỗ Trợ 24/7",
      description: "Đội ngũ hỗ trợ chuyên nghiệp, sẵn sàng phục vụ mọi lúc"
    },
    {
      icon: HardHat,
      title: "Chuyên Môn",
      description: "Đội ngũ kỹ thuật viên được đào tạo chuyên sâu và có nhiều kinh nghiệm"
    },
    {
      icon: TrendingUp,
      title: "Phát Triển",
      description: "Không ngừng cải tiến và nâng cao chất lượng dịch vụ"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[60vh] bg-blue-600 flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('/repair-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            {...fadeInUp}
          >
            Repair Dash
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Nền tảng kết nối dịch vụ sửa chữa hàng đầu tại Việt Nam
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 ${stat.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-2xl font-bold text-white">{stat.number}</span>
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <motion.section 
        className="py-16 px-4 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Sứ Mệnh Của Chúng Tôi</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                Repair Dash ra đời với sứ mệnh đơn giản hóa quá trình tìm kiếm và đặt lịch sửa chữa, 
                mang đến giải pháp toàn diện cho mọi nhu cầu sửa chữa tại nhà.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Chúng tôi kết nối khách hàng với mạng lưới các chuyên gia sửa chữa uy tín, 
                đảm bảo chất lượng dịch vụ và sự hài lòng của khách hàng.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-blue-50 p-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold mb-2">Tiện Lợi</h3>
                <p className="text-gray-600">Đặt lịch dễ dàng, theo dõi realtime</p>
              </motion.div>
              <motion.div 
                className="bg-green-50 p-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold mb-2">An Toàn</h3>
                <p className="text-gray-600">Đối tác uy tín, được thẩm định kỹ</p>
              </motion.div>
              <motion.div 
                className="bg-yellow-50 p-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold mb-2">Chất Lượng</h3>
                <p className="text-gray-600">Dịch vụ chuyên nghiệp, bảo hành</p>
              </motion.div>
              <motion.div 
                className="bg-red-50 p-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold mb-2">Hỗ Trợ</h3>
                <p className="text-gray-600">Tư vấn 24/7, giải đáp nhanh chóng</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Giá Trị Cốt Lõi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <value.icon className="w-12 h-12 text-blue-600 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Sẵn Sàng Trải Nghiệm?</h2>
          <p className="text-xl mb-8">
            Hãy để Repair Dash giúp bạn tìm kiếm dịch vụ sửa chữa phù hợp nhất
          </p>
          <motion.button
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đặt Lịch Ngay
          </motion.button>
        </div>
      </section>
    </div>
  );
} 