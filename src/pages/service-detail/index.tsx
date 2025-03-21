import ServiceInformation from "./components/service-information";
import ServiceReview from "./components/service-review";
import Rating from "@/components/common/rating";

const ServiceDetail = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900">Sửa chữa điện lạnh</h2>
      <div className="mt-2 flex items-center gap-1">
        <Rating number={4.8} />
        <div className="mt-1">
          <span className="font-semibold">4.8</span>
          <span className="ml-1 text-gray-500">(3 đánh giá)</span>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-6 mt-6">
        <div className="lg:w-[60%] h-max">
          <img
            src="https://images.unsplash.com/photo-1550041473-d296a3a8a18a?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Service"
            className="w-full h-[600px] object-cover border rounded-lg shadow"
          />
          {/* service description */}
          <div className="mt-10 w-full border rounded-lg shadow py-4 px-6 bg-white">
            <h5 className="font-semibold text-xl">Chi tiết dịch vụ</h5>
            <p className="text-gray-700 text-lg leading-relaxed mt-4">
              TechCare là đơn vị chuyên cung cấp dịch vụ sửa chữa, bảo trì và
              lắp đặt các thiết bị điện lạnh như máy giặt, điều hòa, tủ lạnh, lò
              vi sóng, máy nước nóng với đội ngũ kỹ thuật viên giàu kinh nghiệm,
              tay nghề cao và luôn tận tâm với khách hàng. Chúng tôi cam kết
              mang đến dịch vụ nhanh chóng, chuyên nghiệp, đảm bảo thiết bị của
              bạn được sửa chữa triệt để với linh kiện chính hãng và mức giá hợp
              lý. TechCare không chỉ giúp khắc phục các sự cố hỏng hóc mà còn tư
              vấn giải pháp bảo trì định kỳ, giúp thiết bị hoạt động bền bỉ,
              tiết kiệm điện năng và kéo dài tuổi thọ. Với phương châm "Sửa
              nhanh – Giá tốt – Bảo hành dài hạn", TechCare luôn sẵn sàng phục
              vụ khách hàng 24/7, có mặt tận nơi chỉ trong 30 phút để kiểm tra
              và sửa chữa thiết bị. Hãy để chúng tôi giúp bạn giải quyết mọi vấn
              đề điện lạnh một cách hiệu quả nhất!
            </p>
          </div>
        </div>
        <div className="flex-1">
          <ServiceInformation />
          <ServiceReview />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
