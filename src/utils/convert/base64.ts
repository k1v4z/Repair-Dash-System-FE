/**
 * Chuyển đổi file thành chuỗi base64
 * @param file File cần chuyển đổi
 * @returns Promise<string> Chuỗi base64
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
 * Chuyển đổi nhiều file thành mảng chuỗi base64
 * @param files Mảng File cần chuyển đổi
 * @returns Promise<string[]> Mảng chuỗi base64
 */
export const convertMultipleToBase64 = async (files: File[]): Promise<string[]> => {
  const promises = files.map(file => convertToBase64(file));
  return await Promise.all(promises);
}; 