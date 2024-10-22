import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { GET_ORDERS_QUERY_KEY } from '~constants/user-query-key';
import { SortOrder } from '~graphql/graphql';
import { GetOrdersQuery } from '~services/order.service';
import { TableRequestState } from '~types/table.type';
import execute from '~utils/execute';

const useGetOrders = ({ sorting, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_ORDERS_QUERY_KEY, sorting, pagination],
    queryFn: () =>
      execute(GetOrdersQuery, {
        currentPage: pagination.pageIndex * pagination.pageSize + 1, // offset
        currentItem: pagination.pageSize, // limit
        sort: sorting[0]?.id ?? 'id',
        order: sorting[0]?.desc ? SortOrder.Desc : SortOrder.Asc,
      }),
    select: (data) => {
      return {
        data: data.data.orders.items,
        currentPage: data.data.orders.pageInfo.currentPage,
        currentIndex: data.data.orders.pageInfo.currentItem,
        totalItem: data.data.orders.pageInfo.totalItem,
        totalPage: data.data.orders.pageInfo.totalPage,
      };
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  return { data, isLoading };
};

export default useGetOrders;
