import { useUploadFile } from "@/hooks/useUploadFile";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "../ui/input";
import Icon from "../icons";

export interface FileUploadProps {
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
  files?: File[];
  onFilesSelected?: (files: File[]) => void;
  onFileRemoved?: (fileId: string) => void;
  onUploadComplete?: (files: File[]) => void;
  // Custom upload function - if provided, will handle the upload progress
  uploadFunction?: (
    file: File,
    onProgress: (progress: number) => void
  ) => Promise<void>;
  initialFiles?: File[];
  disabled?: boolean;
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
  disabled = false,
}: FileUploadProps) => {
  const {
    files,
    getMetadata,
    error,
    fileInputRef,
    handleFileChange,
    handleRemoveFile,
  } = useUploadFile({
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
        type="button"
        className="mb-4 flex items-center gap-2 [&_svg]:size-4"
        disabled={disabled}
      >
        <Icon glyph="upload" className="fill-white" />
        {buttonText}
      </Button>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <Icon glyph="alertCircle" className="size-4 fill-white" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        {files.length === 0 ? (
          <div className="text-center py-4 text-gray-500">{emptyMessage}</div>
        ) : (
          files.map((file) => {
            const metadata = getMetadata(file);
            return (
              <div
                key={metadata.id}
                className="border rounded-md p-3 flex items-center gap-3"
              >
                {metadata.preview ? (
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <img
                      src={metadata.preview}
                      alt={file.name}
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 bg-gray-100 flex items-center justify-center rounded flex-shrink-0">
                    <span className="text-xs font-medium uppercase">
                      {file.type.split("/")[1]}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="truncate pr-2">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveFile(metadata.id)}
                      disabled={disabled}
                      className="text-gray-500 hover:bg-transparent p-2 [&_svg]:size-3"
                      aria-label="Remove file"
                    >
                      <Icon glyph="x" />
                    </Button>
                  </div>
                  <div className="mt-1">
                    {metadata.error ? (
                      <div className="text-xs text-red-500 flex items-center gap-1">
                        <Icon glyph="alertCircle" className="size-4" />
                        {metadata.error}
                      </div>
                    ) : metadata.uploaded ? (
                      <div className="text-xs text-green-500 flex items-center gap-1">
                        <Icon
                          glyph="checkCircle"
                          className="size-4 fill-white"
                        />
                        Tải lên thành công
                      </div>
                    ) : (
                      <>
                        <Progress
                          value={metadata.progress}
                          className="h-1 w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {metadata.progress.toFixed(0)}% đã tải lên
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FileUpload;
