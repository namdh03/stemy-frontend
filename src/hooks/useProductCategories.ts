import { useQuery } from '@tanstack/react-query';

import { GET_PRODUCT_CATEGORIES_QUERY_KEY } from '~constants/user-query-key';
import { GetProductCategories } from '~services/productCategory.service';
import execute from '~utils/execute';

const useProductCategories = () => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_PRODUCT_CATEGORIES_QUERY_KEY],
    queryFn: () => execute(GetProductCategories),
    refetchOnWindowFocus: false,
    select: (data) => data.data.productCategories.filter((item) => !item.isDelete),
  });

  return { data, isLoading };
};

export default useProductCategories;
