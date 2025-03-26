export const getUrlExtension = (url: string) => {
  const parts = url.split("/");
  return parts.pop()?.split("?")[0]; //Remove query params if any
};

export const convertUrlToFile = async (url: string) => {
  const extension = getUrlExtension(url);
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], `${Date.now()}.${extension}`, {
    type: `image/${extension}`,
  });
};

export const convertMultipleUrlToFile = async (
  urls: string[]
): Promise<File[]> => {
  if (!urls || urls.length === 0) return [];

  return Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url);
        const blob = await response.blob();

        // Extract the filename from the URL
        const fileName = url.split("/").pop() || `image-${Date.now()}.jpg`;

        // Create a new File object from the blob
        const file = new File([blob], fileName, {
          type: blob.type || "image/jpeg",
        });

        return file;
      } catch (error) {
        console.error("Error converting URL to File:", error);
        throw error;
      }
    })
  );
};

/**
 * Convert file to base64
 * @param file File need to convert
 * @returns Promise<string> Base64 string
 */
export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Convert multiple files to base64 array
 * @param files Array of files need to convert
 * @returns Promise<string[]> Array of base64 string
 */
export const convertMultipleToBase64 = async (
  files: File[]
): Promise<string[]> => {
  const promises = files.map((file) => convertToBase64(file));
  return await Promise.all(promises);
};
