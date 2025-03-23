import { useUploadFile } from "@/hooks/useUploadFile";
import { X, Upload, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "../ui/input";

export interface FileInfo {
  file: File;
  id: string;
  preview?: string;
  progress: number;
  error?: string;
  uploaded?: boolean;
}

export interface FileUploadProps {
  files?: FileInfo[];
  multiple?: boolean;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  buttonText?: string;
  buttonVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  emptyMessage?: string;
  className?: string;
  onFilesSelected?: (files: File[]) => void;
  onFileRemoved?: (fileId: string) => void;
  onUploadComplete?: (files: File[]) => void;
  // Custom upload function - if provided, will handle the upload progress
  uploadFunction?: (
    file: File,
    onProgress: (progress: number) => void
  ) => Promise<void>;
  initialFiles?: FileInfo[];
}

const FileUpload = ({
  initialFiles = [],
  multiple = false,
  acceptedFileTypes = ["image/png", "application/pdf"],
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 5,
  buttonText = "Tải lên",
  emptyMessage = "Không có file được chọn",
  className = "",
  buttonVariant = "default",
  onFilesSelected,
  onFileRemoved,
  onUploadComplete,
  uploadFunction,
}: FileUploadProps) => {
  const { files, error, fileInputRef, handleFileChange, handleRemoveFile } =
    useUploadFile({
      multiple,
      acceptedFileTypes,
      maxFileSize,
      maxFiles,
      onFilesSelected,
      onFileRemoved,
      onUploadComplete,
      uploadFunction,
      initialFiles,
    });

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`w-full ${className}`}>
      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        multiple={multiple}
        accept={acceptedFileTypes.join(",")}
        onChange={handleFileChange}
      />
      <Button
        variant={buttonVariant}
        onClick={handleButtonClick}
        className="mb-4 flex items-center gap-2"
      >
        <Upload size={16} />
        {buttonText}
      </Button>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        {files.length === 0 ? (
          <div className="text-center py-4 text-gray-500">{emptyMessage}</div>
        ) : (
          files.map((fileInfo) => (
            <div
              key={fileInfo.id}
              className="border rounded-md p-3 flex items-center gap-3"
            >
              {fileInfo.preview ? (
                <div className="relative h-16 w-16 flex-shrink-0">
                  <img
                    src={fileInfo.preview}
                    alt={fileInfo.file.name}
                    className="h-full w-full object-cover rounded"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 bg-gray-100 flex items-center justify-center rounded flex-shrink-0">
                  <span className="text-xs font-medium uppercase">
                    {fileInfo.file.type.split("/")[1]}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="truncate pr-2">
                    <p className="text-sm font-medium truncate">
                      {fileInfo.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(fileInfo.file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFile(fileInfo.id)}
                    className="text-gray-500 hover:text-red-500"
                    aria-label="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="mt-1">
                  {fileInfo.error ? (
                    <div className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {fileInfo.error}
                    </div>
                  ) : fileInfo.uploaded ? (
                    <div className="text-xs text-green-500 flex items-center gap-1">
                      <CheckCircle size={12} />
                      Tải lên thành công
                    </div>
                  ) : (
                    <>
                      <Progress
                        value={fileInfo.progress}
                        className="h-1 w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {fileInfo.progress.toFixed(0)}% đã tải lên
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FileUpload;
