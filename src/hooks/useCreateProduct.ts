import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_TABLE_PRODUCTS_QUERY_KEY } from '~constants/user-query-key';
import { CreateProductMutation } from '~services/product.service';
import { executeWithFormData } from '~utils/execute';

interface UseCreateProductParams {
  input: {
    name: string;
    categoryIds: number[];
    description: string;
    price: number;
    labPrice: number;
  };
  images: File[];
  labDocument: File;
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ input, images, labDocument }: UseCreateProductParams) => {
      const formData = new FormData();
      formData.append(
        'operations',
        JSON.stringify({
          query: CreateProductMutation,
          variables: {
            input,
            images: images.map(() => null), // map images to null in the initial variables
            lab: null,
          },
        }),
      );

      // Create map for the files
      const filesMap: { [key: string]: string[] } = {};
      images.forEach((_, index) => {
        filesMap[index.toString()] = [`variables.images.${index}`];
      });

      if (labDocument) {
        filesMap[images.length.toString()] = ['variables.lab'];
      }

      formData.append('map', JSON.stringify(filesMap));

      // Append the actual files to formData
      images.forEach((image, index) => formData.append(`${index}`, image));
      formData.append(images.length.toString(), labDocument);

      return executeWithFormData(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TABLE_PRODUCTS_QUERY_KEY] });
    },
  });
};
