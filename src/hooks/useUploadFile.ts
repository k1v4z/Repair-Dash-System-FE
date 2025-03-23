import { useState, useRef, ChangeEvent, useEffect } from "react";

export interface FileInfo {
  file: File;
  id: string;
  preview?: string;
  progress: number;
  error?: string;
  uploaded?: boolean;
}

export const useUploadFile = ({
  initialFiles = [],
  multiple = false,
  acceptedFileTypes = ["image/png", "application/pdf"],
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 5,
  onFilesSelected,
  onFileRemoved,
  onUploadComplete,
  uploadFunction,
}: {
  initialFiles?: FileInfo[];
  multiple?: boolean;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  onFileRemoved?: (fileId: string) => void;
  onUploadComplete?: (files: File[]) => void;
  uploadFunction?: (
    file: File,
    onProgress: (progress: number) => void
  ) => Promise<void>;
}) => {
  const [files, setFiles] = useState<FileInfo[]>(initialFiles);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFiles) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  const validateFile = (file: File): string | null => {
    if (!acceptedFileTypes.includes(file.type)) {
      return `Invalid file type. Accepted types: ${acceptedFileTypes
        .map((type) => type.split("/")[1])
        .join(", ")}`;
    }

    if (file.size > maxFileSize) {
      const sizeMB = maxFileSize / (1024 * 1024);
      return `File size exceeds maximum limit of ${sizeMB} MB`;
    }

    return null;
  };

  const createPreview = (file: File): string | undefined => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  const uploadFile = async (fileInfo: FileInfo) => {
    try {
      const updateProgress = (progress: number) => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id === fileInfo.id ? { ...f, progress, error: undefined } : f
          )
        );
      };

      if (uploadFunction) {
        await uploadFunction(fileInfo.file, updateProgress);
      } else {
        // Simulate upload if no upload function is provided
        const totalSteps = 10;
        for (let i = 1; i <= totalSteps; i++) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          updateProgress((i / totalSteps) * 100);
        }
      }

      // Mark as uploaded
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileInfo.id ? { ...f, uploaded: true } : f
        )
      );
    } catch {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileInfo.id
            ? { ...f, error: "Upload failed", progress: 0 }
            : f
        )
      );
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFiles = Array.from(e.target.files || []);

    if (!multiple && selectedFiles.length > 1) {
      setError("Multiple file selection is not allowed");
      return;
    }

    if (multiple && selectedFiles.length + files.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} files`);
      return;
    }

    const newFiles: FileInfo[] = [];
    const validFiles: File[] = [];

    selectedFiles.forEach((file) => {
      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        return;
      }

      const fileInfo: FileInfo = {
        file,
        id: `${file.name}-${Date.now()}`,
        preview: createPreview(file),
        progress: 0,
      };

      newFiles.push(fileInfo);
      validFiles.push(file);
    });

    if (newFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);

      if (onFilesSelected) {
        onFilesSelected(validFiles);
      }

      newFiles.forEach(uploadFile);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prevFiles) => {
      const fileToRemove = prevFiles.find((f) => f.id === id);

      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      if (onFileRemoved && fileToRemove) {
        onFileRemoved(id);
      }

      return prevFiles.filter((f) => f.id !== id);
    });
  };

  useEffect(() => {
    if (
      files.length > 0 &&
      files.every((f) => f.uploaded) &&
      onUploadComplete
    ) {
      onUploadComplete(files.map((f) => f.file));
    }
  }, [files, onUploadComplete]);

  useEffect(() => {
    return () => {
      files.forEach((fileInfo) => {
        if (fileInfo.preview) {
          URL.revokeObjectURL(fileInfo.preview);
        }
      });
    };
  }, [files]);

  return {
    files,
    error,
    fileInputRef,
    handleFileChange,
    handleRemoveFile,
  };
};
