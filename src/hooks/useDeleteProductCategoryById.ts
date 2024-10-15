import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_PRODUCT_CATEGORIES_QUERY_KEY } from '~constants/user-query-key';
import { DeleteProductCategory } from '~services/productCategory.service';
import execute from '~utils/execute';

interface UseDeleteProductCategoryByIdParams {
  id: number;
}

export const useDeleteProductCategoryById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: UseDeleteProductCategoryByIdParams) => {
      return execute(DeleteProductCategory, { id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCT_CATEGORIES_QUERY_KEY] });
    },
  });
};
