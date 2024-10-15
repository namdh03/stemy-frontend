import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_PRODUCT_CATEGORIES_QUERY_KEY } from '~constants/user-query-key';
import { CategoryType } from '~graphql/graphql';
import { UpdateProductCategory } from '~services/productCategory.service';
import execute from '~utils/execute';

interface UseUpdateProductCategoryParams {
  id: number;
  input: {
    name: string;
    title: string;
    type: CategoryType;
  };
}

export const useUpdateProductCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: UseUpdateProductCategoryParams) => {
      return execute(UpdateProductCategory, { id, input });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCT_CATEGORIES_QUERY_KEY] });
    },
  });
};
