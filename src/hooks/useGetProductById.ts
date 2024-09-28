import { useQuery } from '@tanstack/react-query';

import { GET_PRODUCT_BY_ID_QUERY_KEY } from '~constants/user-query-key';
import { GetProductByIdQuery } from '~services/product.service';
import execute from '~utils/execute';

export const useGetProductById = (id: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_PRODUCT_BY_ID_QUERY_KEY, id],
    queryFn: () => execute(GetProductByIdQuery, { id }),
    select: (data) => data.data.product,
    enabled: !!id,
  });

  return { data, isLoading };
};
