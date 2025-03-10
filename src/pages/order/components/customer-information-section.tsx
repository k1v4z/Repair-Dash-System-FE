import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ImageUploadSection from "./image-upload-section";
import LocationSelector from "./location-selector";

export default function CustomerInformationSection() {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-blue-700 text-left">
        Thông tin khách hàng
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-left w-full block">
              Họ tên
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-left w-full block">
              Số điện thoại
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-left w-full block">
            Số nhà / Đường
          </Label>
          <Input
            id="address"
            placeholder="Enter your address"
            className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md"
          />
        </div>
        <LocationSelector />
        <ImageUploadSection />
        <div className="space-y-2">
          <Label htmlFor="description" className="text-left w-full block">
            Mô tả chi tiết
          </Label>
          <Textarea
            id="description"
            placeholder="Mô tả chi tiết về hư hỏng thiết bị của bạn và yêu cầu sửa chữa"
            className="text-black px-4 py-3 rounded-lg border border-primary-grayLight bg-white shadow-md h-32"
          />
        </div>
      </div>
    </Card>
  );
}
