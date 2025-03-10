import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icons from "@/components/icons";

export default function ServiceInformationSection() {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-blue-700 text-left">
        Thông tin dịch vụ
      </h2>
      <div className="space-y-6">
        <img
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800"
          alt="Service"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icons glyph="location" className="w-5 h-5 text-blue-600 mt-1" />
            <p className="text-gray-600">123 Service Street, Tech District</p>
          </div>
          <div className="flex items-start gap-3">
            <Icons glyph="store" className="size-5 fill-blue-600 mt-1" />
            <p className="text-gray-600">TechCare Service Center</p>
          </div>
          <div className="flex items-start gap-3">
            <Icons glyph="wrench" className="size-5 fill-blue-600 mt-1" />
            <p className="text-gray-600">Premium Device Repair</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium text-blue-700">Số kĩ thuật viên</p>
            <p className="text-blue-600">
              2 kĩ thuật viên đang sẵn sàng phục vụ
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Huỷ
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Đặt dịch vụ</Button>
        </div>
      </div>
    </Card>
  );
}
