import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_PRODUCT_CATEGORIES_QUERY_KEY } from '~constants/user-query-key';
import { CategoryType } from '~graphql/graphql';
import { CreateProductCategory } from '~services/productCategory.service';
import execute from '~utils/execute';

interface UseCreateProductCategoryParams {
  input: {
    name: string;
    title: string;
    type: CategoryType;
  };
}

export const useCreateProductCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ input }: UseCreateProductCategoryParams) => {
      return execute(CreateProductCategory, { input });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCT_CATEGORIES_QUERY_KEY] });
    },
  });
};
