import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GET_TABLE_PRODUCTS_QUERY_KEY } from '~constants/user-query-key';
import { DeleteProductMutation } from '~services/product.service';
import execute from '~utils/execute';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => execute(DeleteProductMutation, { id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_TABLE_PRODUCTS_QUERY_KEY],
      });
    },
  });
};
