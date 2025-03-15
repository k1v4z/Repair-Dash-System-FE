import { ChangeEvent, useState } from "react";
import { Button } from "./button";
import Icon from "@/components/icons";
interface ImageUploadProps {
  onImageChange: (file: File) => void;
  defaultImage?: string;
  className?: string;
}

export function ImageUpload({ onImageChange, defaultImage, className = "" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(defaultImage || "");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Kiểm tra file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Tạo preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    onImageChange(file);
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div 
        className={`
          relative w-[300px] h-[200px] border-2 border-dashed rounded-lg
          flex items-center justify-center cursor-pointer
          ${preview ? 'border-transparent' : 'border-gray-300'}
        `}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center">
            <div className="mb-2 flex justify-center items-center">
              <Icon glyph="uploadImg" className="h-12 w-12 text-gray-400" />
            </div>
            <div className="text-sm text-gray-600">Choose Profile Picture</div>
          </div>
        )}
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <Button 
        type="button"
        onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}
        className="bg-gray-500 hover:bg-gray-600 text-white"
        >
          Tải ảnh
      </Button>
    </div>
  );
} 