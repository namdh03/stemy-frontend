import { z } from 'zod';

// Define the schema
export const createCategorySchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
});

export type CreateCategoryFormType = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  type: z.string().min(1),
});

export type UpdateCategoryFormType = z.infer<typeof updateCategorySchema>;
