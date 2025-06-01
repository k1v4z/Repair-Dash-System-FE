import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  Phone,
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: "booking",
    question: "Làm thế nào để đặt dịch vụ sửa chữa?",
    answer: "Để đặt dịch vụ, bạn chỉ cần: 1) Chọn loại dịch vụ cần sửa chữa, 2) Chọn cửa hàng phù hợp, 3) Chọn thời gian và điền thông tin liên hệ, 4) Xác nhận đặt lịch.",
    category: "Đặt Lịch"
  },
  {
    id: "cancel",
    question: "Làm thế nào để hủy hoặc thay đổi lịch đã đặt?",
    answer: "Bạn có thể hủy hoặc thay đổi lịch đã đặt trong mục 'Lịch Sử Đặt Lịch' trên tài khoản của bạn. Việc hủy lịch cần được thực hiện ít nhất 2 giờ trước giờ hẹn.",
    category: "Đặt Lịch"
  },
  {
    id: "payment",
    question: "Các phương thức thanh toán nào được chấp nhận?",
    answer: "Chúng tôi chấp nhận nhiều phương thức thanh toán bao gồm: thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, và các ví điện tử phổ biến như MoMo, ZaloPay.",
    category: "Thanh Toán"
  },
  {
    id: "refund",
    question: "Chính sách hoàn tiền như thế nào?",
    answer: "Nếu dịch vụ không được thực hiện hoặc không đạt yêu cầu, bạn có thể yêu cầu hoàn tiền trong vòng 24 giờ. Mỗi trường hợp sẽ được xem xét cụ thể.",
    category: "Thanh Toán"
  },
  {
    id: "warranty",
    question: "Dịch vụ có được bảo hành không?",
    answer: "Có, tất cả các dịch vụ sửa chữa đều được bảo hành từ 1-3 tháng tùy loại dịch vụ. Chi tiết bảo hành sẽ được thông báo trước khi thực hiện dịch vụ.",
    category: "Dịch Vụ"
  },
  {
    id: "quality",
    question: "Làm sao để đảm bảo chất lượng dịch vụ?",
    answer: "Chúng tôi chỉ hợp tác với các cửa hàng đã được thẩm định kỹ lưỡng. Mỗi cửa hàng đều có đánh giá và nhận xét từ khách hàng trước để bạn tham khảo.",
    category: "Dịch Vụ"
  }
];

const categories = ["Tất Cả", "Đặt Lịch", "Thanh Toán", "Dịch Vụ"];

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Chat Trực Tuyến",
    description: "Hỗ trợ 24/7",
    action: "Bắt đầu chat",
    color: "bg-blue-500"
  },
  {
    icon: Mail,
    title: "Email",
    description: "support@repairdash.com",
    action: "Gửi email",
    color: "bg-green-500"
  },
  {
    icon: Phone,
    title: "Hotline",
    description: "1900-xxxx",
    action: "Gọi ngay",
    color: "bg-red-500"
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất Cả");

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => 
    selectedCategory === "Tất Cả" || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="bg-blue-600 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Câu Hỏi Thường Gặp</h1>
          <p className="text-lg opacity-90">
            Tìm câu trả lời nhanh cho các thắc mắc của bạn
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="font-medium text-gray-900">{item.question}</span>
                </div>
                {openItems.includes(item.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-4"
                  >
                    <div className="pl-9">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Vẫn chưa tìm được câu trả lời?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="p-4 rounded-lg bg-gray-50"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center mb-3`}>
                  <method.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {method.description}
                </p>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  {method.action}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
} 