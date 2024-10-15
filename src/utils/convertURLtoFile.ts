import { UploadedFile } from '~types/product.type';

const urlToFile = async (url: string, fileName: string): Promise<UploadedFile> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new UploadedFile([blob], fileName, url, { type: blob.type });
  return file;
};
export const convertUrlsToFiles = async (urls: string[]): Promise<UploadedFile[]> => {
  return Promise.all(urls.map((url, index) => urlToFile(url, `image-${index}`)));
};

export const convertUrlToFile = async (url: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], url, { type: blob.type });
  return file;
};
