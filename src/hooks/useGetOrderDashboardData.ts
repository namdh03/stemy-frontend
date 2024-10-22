import { useQuery } from '@tanstack/react-query';

import { ORDER_DASHBOARD_QUERY_KEY } from '~constants/user-query-key';
import { GetAllOrdersQuery } from '~services/order.service';
import execute from '~utils/execute';

export const useGetOrderDashboardData = () => {
  const { data, isLoading } = useQuery({
    queryKey: [ORDER_DASHBOARD_QUERY_KEY],
    queryFn: async () => {
      const response = await execute(GetAllOrdersQuery);
      return response.data.orders.items;
    },
  });

  return { data, isLoading };
};
