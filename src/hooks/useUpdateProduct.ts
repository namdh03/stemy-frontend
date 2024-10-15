import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_TABLE_PRODUCTS_QUERY_KEY } from '~constants/user-query-key';
import { UpdateProductMutation } from '~services/product.service';
import { executeWithFormData } from '~utils/execute';

interface UseUpdateProductParams {
  id: number;
  input: {
    name: string;
    categoryIds: number[];
    description: string;
    price: number;
    labPrice: number;
  };
  images: File[];
  labDocument: File | null;
  labChanged: boolean;
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input, images, labDocument, labChanged }: UseUpdateProductParams) => {
      const formData = new FormData();
      formData.append(
        'operations',
        JSON.stringify({
          query: UpdateProductMutation,
          variables: {
            id,
            input,
            images: images.map(() => null),
            lab: labChanged ? labDocument : null,
          },
        }),
      );

      const filesMap: { [key: string]: string[] } = {};
      images.forEach((_, index) => {
        filesMap[index.toString()] = [`variables.images.${index}`];
      });

      if (labDocument) {
        filesMap[images.length.toString()] = ['variables.lab'];
      }

      formData.append('map', JSON.stringify(filesMap));

      images.forEach((image, index) => formData.append(`${index}`, image));
      if (labChanged && labDocument) {
        formData.append(images.length.toString(), labDocument);
      }

      return executeWithFormData(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TABLE_PRODUCTS_QUERY_KEY] });
    },
  });
};