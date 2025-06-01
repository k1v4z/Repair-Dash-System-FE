import { motion } from "framer-motion";
import {
  Shield,
  Database,
  Lock,
  Share2,
  Cookie,
  Trash2,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const sections = [
  {
    id: "collection",
    icon: Database,
    title: "1. Thu Thập Thông Tin",
    content: "Chúng tôi thu thập các loại thông tin sau:",
    list: [
      "Thông tin cá nhân (tên, email, số điện thoại)",
      "Thông tin thiết bị và trình duyệt",
      "Lịch sử đặt dịch vụ và thanh toán",
      "Dữ liệu tương tác với nền tảng"
    ]
  },
  {
    id: "usage",
    icon: Shield,
    title: "2. Sử Dụng Thông Tin",
    content: "Thông tin của bạn được sử dụng để:",
    list: [
      "Cung cấp và cải thiện dịch vụ",
      "Xử lý giao dịch và thanh toán",
      "Liên lạc về dịch vụ và cập nhật",
      "Phân tích và nghiên cứu người dùng",
      "Tuân thủ nghĩa vụ pháp lý"
    ]
  },
  {
    id: "protection",
    icon: Lock,
    title: "3. Bảo Vệ Thông Tin",
    content: "Chúng tôi cam kết bảo vệ thông tin của bạn thông qua:",
    list: [
      "Mã hóa dữ liệu theo tiêu chuẩn ngành",
      "Kiểm soát truy cập nghiêm ngặt",
      "Đào tạo nhân viên về bảo mật",
      "Cập nhật thường xuyên các biện pháp bảo vệ"
    ]
  },
  {
    id: "sharing",
    icon: Share2,
    title: "4. Chia Sẻ Thông Tin",
    content: "Chúng tôi có thể chia sẻ thông tin với:",
    list: [
      "Đối tác cung cấp dịch vụ sửa chữa",
      "Nhà cung cấp dịch vụ thanh toán",
      "Cơ quan pháp luật khi được yêu cầu",
      "Đối tác phân tích và nghiên cứu (dữ liệu ẩn danh)"
    ]
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "5. Cookie và Công Nghệ Theo Dõi",
    content: `Chúng tôi sử dụng cookie và các công nghệ tương tự để cải thiện trải nghiệm của bạn. 
    Bạn có thể kiểm soát việc sử dụng cookie thông qua cài đặt trình duyệt.`
  },
  {
    id: "rights",
    icon: Trash2,
    title: "6. Quyền của Người Dùng",
    content: "Bạn có các quyền sau đối với dữ liệu của mình:",
    list: [
      "Truy cập và xem thông tin cá nhân",
      "Yêu cầu chỉnh sửa thông tin không chính xác",
      "Yêu cầu xóa thông tin",
      "Phản đối việc xử lý thông tin",
      "Rút lại sự đồng ý đã cho phép"
    ]
  }
];

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "privacy@repairdash.com",
    color: "bg-blue-500"
  },
  {
    icon: Phone,
    title: "Hotline",
    content: "1900-xxxx",
    color: "bg-green-500"
  },
  {
    icon: MapPin,
    title: "Địa chỉ",
    content: "[Địa chỉ văn phòng]",
    color: "bg-red-500"
  }
];

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-4">Chính Sách Bảo Mật</h1>
          <p className="text-lg opacity-90">
            Cam kết bảo vệ thông tin cá nhân của bạn là ưu tiên hàng đầu của chúng tôi
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <section.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {section.title}
                </h2>
              </div>

              {section.content && (
                <p className="text-gray-600 leading-relaxed mb-4">
                  {section.content}
                </p>
              )}

              {section.list && (
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </div>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">7. Liên Hệ về Quyền Riêng Tư</h2>
          <p className="text-gray-600 mb-6">
            Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào về quyền riêng tư của mình, vui lòng liên hệ với chúng tôi qua:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                className="p-4 rounded-lg bg-gray-50"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-10 h-10 ${info.color} rounded-full flex items-center justify-center mb-3`}>
                  <info.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                <p className="text-gray-600">{info.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Last Updated */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
        </div>
      </div>
    </div>
  );
} 