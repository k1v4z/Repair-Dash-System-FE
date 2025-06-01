import { motion } from "framer-motion";
import {
  FileText,
  UserCheck,
  CreditCard,
  Scale,
  AlertTriangle,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const sections = [
  {
    id: "general",
    icon: FileText,
    title: "1. Điều Khoản Chung",
    content: `Bằng việc truy cập và sử dụng dịch vụ của Repair Dash, bạn đồng ý tuân thủ và chịu ràng buộc bởi các điều khoản và điều kiện này. 
    Nếu bạn không đồng ý với bất kỳ phần nào của điều khoản, vui lòng không sử dụng dịch vụ của chúng tôi.`
  },
  {
    id: "account",
    icon: UserCheck,
    title: "2. Tài Khoản Người Dùng",
    content: "Khi tạo tài khoản với chúng tôi, bạn phải:",
    list: [
      "Cung cấp thông tin chính xác và đầy đủ",
      "Cập nhật thông tin khi có thay đổi",
      "Bảo mật thông tin đăng nhập",
      "Chịu trách nhiệm về mọi hoạt động dưới tài khoản của mình"
    ]
  },
  {
    id: "service",
    icon: CreditCard,
    title: "3. Dịch Vụ và Thanh Toán",
    content: "Repair Dash cung cấp nền tảng kết nối giữa khách hàng và các cửa hàng sửa chữa. Chúng tôi:",
    list: [
      "Không trực tiếp cung cấp dịch vụ sửa chữa",
      "Không chịu trách nhiệm về chất lượng dịch vụ của các cửa hàng",
      "Chỉ đóng vai trò trung gian kết nối",
      "Thu phí dịch vụ theo quy định công khai"
    ]
  },
  {
    id: "rights",
    icon: Scale,
    title: "4. Quyền và Trách Nhiệm",
    subsections: [
      {
        title: "Quyền của người dùng:",
        list: [
          "Được sử dụng đầy đủ các tính năng của nền tảng",
          "Được bảo vệ thông tin cá nhân",
          "Được hỗ trợ khi gặp vấn đề",
          "Được khiếu nại và góp ý"
        ]
      },
      {
        title: "Trách nhiệm của người dùng:",
        list: [
          "Tuân thủ các quy định của nền tảng",
          "Không lạm dụng dịch vụ",
          "Không cung cấp thông tin sai lệch",
          "Thanh toán đầy đủ và đúng hạn"
        ]
      }
    ]
  },
  {
    id: "changes",
    icon: AlertTriangle,
    title: "5. Thay Đổi và Chấm Dứt",
    content: `Repair Dash có quyền thay đổi, tạm ngưng hoặc chấm dứt dịch vụ bất kỳ lúc nào. 
    Chúng tôi sẽ thông báo trước về những thay đổi quan trọng qua email hoặc thông báo trên nền tảng.`
  }
];

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "legal@repairdash.com",
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

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-4">Điều Khoản Dịch Vụ</h1>
          <p className="text-lg opacity-90">
            Vui lòng đọc kỹ các điều khoản dưới đây trước khi sử dụng dịch vụ của chúng tôi
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

              {section.subsections && (
                <div className="space-y-6">
                  {section.subsections.map((subsection, i) => (
                    <div key={i}>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {subsection.title}
                      </h3>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        {subsection.list.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">6. Liên Hệ</h2>
          <p className="text-gray-600 mb-6">
            Nếu bạn có bất kỳ câu hỏi nào về Điều khoản Dịch vụ này, vui lòng liên hệ với chúng tôi qua:
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