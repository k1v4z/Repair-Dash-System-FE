import { useState, useRef, ChangeEvent, useEffect } from "react";

// Create a WeakMap to store metadata for each File instance
const fileMetadata = new WeakMap<
  File,
  {
    id: string;
    preview?: string;
    progress: number;
    error?: string;
    uploaded?: boolean;
  }
>();

// Helper functions to work with the WeakMap
const getMetadata = (file: File) => {
  if (!fileMetadata.has(file)) {
    fileMetadata.set(file, {
      id: `${file.name}-${Date.now()}`,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
      progress: 0,
      error: undefined,
      uploaded: false,
    });
  }
  return fileMetadata.get(file)!;
};

const setMetadata = (
  file: File,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Partial<typeof fileMetadata extends WeakMap<any, infer T> ? T : never>
) => {
  fileMetadata.set(file, { ...getMetadata(file), ...data });
  return fileMetadata.get(file)!;
};

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
  initialFiles?: File[];
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
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initialize metadata for initial files
    initialFiles.forEach((file) => {
      if (!fileMetadata.has(file)) {
        getMetadata(file);
      }
    });

    setFiles(initialFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initialFiles)]);

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

  const uploadFile = async (file: File) => {
    try {
      const updateProgress = (progress: number) => {
        setMetadata(file, { progress, error: undefined });
        // Force a re-render by creating a new array
        setFiles((prevFiles) => [...prevFiles]);
      };

      if (uploadFunction) {
        await uploadFunction(file, updateProgress);
      } else {
        // Simulate upload if no upload function is provided
        const totalSteps = 10;
        for (let i = 1; i <= totalSteps; i++) {
          await new Promise((resolve) => setTimeout(resolve, 300));
          updateProgress((i / totalSteps) * 100);
        }
      }

      // Mark as uploaded
      setMetadata(file, { uploaded: true });
      setFiles((prevFiles) => [...prevFiles]); // Force re-render
    } catch {
      setMetadata(file, { error: "Upload failed", progress: 0 });
      setFiles((prevFiles) => [...prevFiles]); // Force re-render
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

    const validFiles: File[] = [];

    selectedFiles.forEach((file) => {
      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        return;
      }

      // Initialize metadata for the file
      getMetadata(file);
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);

      if (onFilesSelected) {
        onFilesSelected(validFiles);
      }

      validFiles.forEach(uploadFile);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (fileId: string) => {
    setFiles((prevFiles) => {
      const fileToRemove = prevFiles.find(
        (file) => getMetadata(file).id === fileId
      );

      if (fileToRemove) {
        const metadata = getMetadata(fileToRemove);
        if (metadata.preview) {
          URL.revokeObjectURL(metadata.preview);
        }

        if (onFileRemoved) {
          onFileRemoved(fileId);
        }
      }

      return prevFiles.filter((file) => getMetadata(file).id !== fileId);
    });
  };

  useEffect(() => {
    if (
      files.length > 0 &&
      files.every((file) => getMetadata(file).uploaded) &&
      onUploadComplete
    ) {
      onUploadComplete(files);
    }
  }, [files, onUploadComplete]);

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        const metadata = getMetadata(file);
        if (metadata.preview) {
          URL.revokeObjectURL(metadata.preview);
        }
      });
    };
  }, [files]);

  return {
    files,
    getMetadata,
    error,
    fileInputRef,
    handleFileChange,
    handleRemoveFile,
  };
};
