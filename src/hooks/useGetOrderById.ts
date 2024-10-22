import { useQuery } from '@tanstack/react-query';

import { GET_ORDER_BY_ID_QUERY_KEY } from '~constants/user-query-key';
import { GetOrderByIdQuery } from '~services/order.service';
import execute from '~utils/execute';

export const useGetOrderById = (id: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_ORDER_BY_ID_QUERY_KEY, id],
    queryFn: () => execute(GetOrderByIdQuery, { id }),
    select: (data) => data.data.order,
    enabled: !!id,
  });

  return { data, isLoading };
};
