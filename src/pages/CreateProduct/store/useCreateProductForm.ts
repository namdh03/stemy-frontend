import { z } from 'zod';

import { UploadedFile } from '~types/product.type';

// Define the schema
export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(0),
  description: z.string().min(1),
  categories: z.array(z.string().min(1)),
  labDocument: z.instanceof(File).refine(
    (file) => {
      return file.type == 'application/pdf';
    },
    {
      message: 'Lab document must be a PDF file',
    },
  ),
  labPrice: z.number().min(0),
  images: z.array(z.instanceof(UploadedFile)),
});

export type CreateProductFormType = z.infer<typeof createProductSchema>;
