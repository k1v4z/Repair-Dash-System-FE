import { useState } from "react";

const StoreDescription = () => {
  const [expanded, setExpanded] = useState(false);
  const description = `
    TechCare là đơn vị chuyên cung cấp dịch vụ sửa chữa, bảo trì và lắp đặt 
    các thiết bị điện lạnh như máy giặt, điều hòa, tủ lạnh, lò vi sóng, máy 
    nước nóng với đội ngũ kỹ thuật viên giàu kinh nghiệm, tay nghề cao và 
    luôn tận tâm với khách hàng. Chúng tôi cam kết mang đến dịch vụ nhanh 
    chóng, chuyên nghiệp, đảm bảo thiết bị của bạn được sửa chữa triệt để 
    với linh kiện chính hãng và mức giá hợp lý. TechCare không chỉ giúp khắc 
    phục các sự cố hỏng hóc mà còn tư vấn giải pháp bảo trì định kỳ, giúp 
    thiết bị hoạt động bền bỉ, tiết kiệm điện năng và kéo dài tuổi thọ. Với 
    phương châm "Sửa nhanh – Giá tốt – Bảo hành dài hạn", TechCare luôn sẵn 
    sàng phục vụ khách hàng 24/7, có mặt tận nơi chỉ trong 30 phút để kiểm 
    tra và sửa chữa thiết bị. Hãy để chúng tôi giúp bạn giải quyết mọi vấn 
    đề điện lạnh một cách hiệu quả nhất!
  `;

  const limit = 700;
  const showReadMore = description.length > limit;
  const shortDescription = description.slice(0, limit);

  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <h3 className="text-xl font-semibold mb-4">TechCare</h3>
      <p className="text-gray-600 text-lg leading-relaxed">
        {expanded || !showReadMore ? (
          description
        ) : (
          <>
            {shortDescription}...
            <span
              onClick={() => setExpanded(true)}
              className="text-gray-600 text-lg cursor-pointer hover:underline"
            >
              Xem thêm
            </span>
          </>
        )}
      </p>
      {expanded && showReadMore && (
        <span
          onClick={() => setExpanded(false)}
          className="text-gray-600 text-lg cursor-pointer hover:underline"
        >
          Thu gọn
        </span>
      )}
    </div>
  );
};

export default StoreDescription;
