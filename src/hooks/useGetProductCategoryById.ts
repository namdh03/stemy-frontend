import { useQuery } from '@tanstack/react-query';

import { GET_PRODUCT_CATEGORY_BY_ID_QUERY_KEY } from '~constants/user-query-key';
import { GetProductCategoryById } from '~services/productCategory.service';
import execute from '~utils/execute';

export const useGetProductCategoryById = (categoryId: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_PRODUCT_CATEGORY_BY_ID_QUERY_KEY, categoryId],
    queryFn: () => execute(GetProductCategoryById, { categoryId }),
    select: (data) => data.data.productCategory,
    enabled: !!categoryId,
  });

  return { data, isLoading };
};
