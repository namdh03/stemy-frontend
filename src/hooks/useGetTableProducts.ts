import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { GET_TABLE_PRODUCTS_QUERY_KEY } from '~constants/user-query-key';
import { SortOrder } from '~graphql/graphql';
import { GetProductTableQuery } from '~services/product.service';
import { TableRequestState } from '~types/table.type';
import execute from '~utils/execute';

const useGetTableProducts = ({ sorting, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_PRODUCTS_QUERY_KEY, sorting, pagination],
    queryFn: () =>
      execute(GetProductTableQuery, {
        currentPage: pagination.pageIndex + 1, // offset
        currentItem: pagination.pageSize, // limit
        sort: sorting[0]?.id ?? 'id',
        order: sorting[0]?.desc ? SortOrder.Desc : SortOrder.Asc,
      }),
    select: (data) => {
      return {
        data: data.data.products.items,
        currentPage: data.data.products.pageInfo.currentPage,
        currentIndex: data.data.products.pageInfo.currentItem,
        totalItem: data.data.products.pageInfo.totalItem,
        totalPage: data.data.products.pageInfo.totalPage,
      };
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  return { data, isLoading };
};

export default useGetTableProducts;
