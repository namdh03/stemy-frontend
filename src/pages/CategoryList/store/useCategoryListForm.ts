import { z } from 'zod';

import { CategoryType } from '~graphql/graphql';

// Define the schema
export const createCategorySchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  type: z.nativeEnum(CategoryType),
});

export type CreateCategoryFormType = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  type: z.nativeEnum(CategoryType),
});

export type UpdateCategoryFormType = z.infer<typeof updateCategorySchema>;
