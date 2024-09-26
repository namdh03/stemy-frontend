import { z } from 'zod';

export class UploadedFile extends File {
  preview: string;

  constructor(fileBits: BlobPart[], fileName: string, preview: string, options?: FilePropertyBag) {
    super(fileBits, fileName, options);
    this.preview = preview;
  }
}

export const UploadedFileSchema = z.instanceof(UploadedFile);

// Define the schema
export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  description: z.string().min(1),
  categories: z.array(z.string().min(1)),
  labDocument: z.instanceof(File).refine(
    (file) => {
      console.log('🚀 ~ file:', file);
      return file.type == 'application/pdf';
    },
    {
      message: 'Lab document must be a PDF file',
    },
  ),
  images: z.array(z.instanceof(UploadedFile)),
});

export type CreateProductFormType = z.infer<typeof createProductSchema>;
