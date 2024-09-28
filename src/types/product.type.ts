import { z } from 'zod';

export type ProductCategory = {
  id: string;
  name: string;
};

export type TableProductType = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: ProductCategory;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
};

export class UploadedFile extends File {
  preview: string;

  constructor(fileBits: BlobPart[], fileName: string, preview: string, options?: FilePropertyBag) {
    super(fileBits, fileName, options);
    this.preview = preview;
  }
}

export const UploadedFileSchema = z.instanceof(UploadedFile);
