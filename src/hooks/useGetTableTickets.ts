import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { GET_TABLE_TICKETS_QUERY_KEY } from '~constants/user-query-key';
import { SortOrder } from '~graphql/graphql';
import { GetTicketsQuery } from '~services/ticket.service';
import { TableRequestState } from '~types/table.type';
import execute from '~utils/execute';

const useGetTableTickets = ({ sorting, pagination }: TableRequestState) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TABLE_TICKETS_QUERY_KEY, sorting, pagination],
    queryFn: () =>
      execute(GetTicketsQuery, {
        currentPage: pagination.pageIndex * pagination.pageSize + 1,
        currentItem: pagination.pageSize,
        sort: sorting[0]?.id ?? 'id',
        order: sorting[0]?.desc ? SortOrder.Desc : SortOrder.Asc,
      }),
    select: (data) => {
      return {
        data: data.data.tickets.items,
        currentPage: data.data.tickets.pageInfo.currentPage,
        currentIndex: data.data.tickets.pageInfo.currentItem,
        totalItem: data.data.tickets.pageInfo.totalItem,
        totalPage: data.data.tickets.pageInfo.totalPage,
      };
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  return { data, isLoading };
};

export default useGetTableTickets;
