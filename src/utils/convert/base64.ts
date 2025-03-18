/**
 * Chuyển đổi file thành chuỗi base64
 * @param file File cần chuyển đổi
 * @returns Promise<string> Chuỗi base64
 */
export const convertToBase64 = (file: File | null): Promise<string> => {
  if (!file) {
    return Promise.reject('No file provided');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Failed to convert to base64');
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Chuyển đổi nhiều file thành mảng chuỗi base64
 * @param files Mảng File cần chuyển đổi
 * @returns Promise<string[]> Mảng chuỗi base64
 */
export const convertMultipleToBase64 = async (files: File[]): Promise<string[]> => {
  const promises = files.map(file => convertToBase64(file));
  return await Promise.all(promises);
}; 