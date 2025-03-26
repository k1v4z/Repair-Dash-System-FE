export const getUrlExtension = (url: string) => {
  const parts = url.split("/");
  return parts.pop()?.split("?")[0]; //Remove query params if any
};

export const convertUrlToFileInfo = async (urls: string[]) => {
  return Promise.all(
    urls.map(async (url) => {
      const extension = getUrlExtension(url);
      const response = await fetch(url);
      const blob = await response.blob();
      return {
        file: new File([blob], `${Date.now()}.${extension}`, {
          type: `image/${extension}`,
        }),
        id: `${Date.now()}-${extension}`,
        preview: url,
        progress: 100,
        error: "",
        uploaded: true,
      };
    })
  );
};
