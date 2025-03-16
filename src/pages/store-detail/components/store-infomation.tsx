import Icons from "@/components/icons";
const StoreInformation = () => {
  return (
    <div className="flex-1">
      <div className="h-80 border rounded-lg shadow p-6 bg-white">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary-royalBlue">
            Thông tin cửa hàng
          </h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Icons glyph="store" className="size-5 fill-blue-600 mt-1" />
            <span>TechCare</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons glyph="location" className="w-5 h-5 text-blue-600 mt-1" />
            <span>123 Đường Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh</span>
          </div>
          <div className="flex items-center gap-2">
            <Icons glyph="wrench" className="size-5 fill-blue-600 mt-1" />
            <span>Dịch vụ sửa chữa điện lạnh tại nhà</span>
          </div>

          <div className="flex items-center gap-1">
            <Icons glyph="star" color="#2563eb" className="w-5 h-5  mt-1" />
            <span className="ml-2">4.8/5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInformation;
