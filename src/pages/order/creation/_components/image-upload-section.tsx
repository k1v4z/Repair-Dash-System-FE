import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Icons from "@/components/icons";

export default function ImageUploadSection() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        const newImages = Array.from(files).map((file) =>
          URL.createObjectURL(file)
        );
        setSelectedImages((prev) => [...prev, ...newImages].slice(0, 3));
      }
    };

    input.click();
  };

  return (
    <div className="space-y-4 mt-4">
      <Label className="text-left w-full block pt-2">Hình ảnh mô tả lỗi</Label>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleImageUpload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
        >
          <Icons glyph="upload" className="w-4 h-4 fill-blue-500" />
          Chọn hình ảnh
        </Button>
        <span className="text-sm text-gray-500">(Tối đa 3 hình ảnh)</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {selectedImages.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
          >
            <img
              src={image}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <Button
              onClick={() =>
                setSelectedImages((prev) => prev.filter((_, i) => i !== index))
              }
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <Icons glyph="x" className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
