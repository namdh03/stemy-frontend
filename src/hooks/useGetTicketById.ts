import { useQuery } from '@tanstack/react-query';

import { GET_TICKET_BY_ID_QUERY_KEY } from '~constants/user-query-key';
import { GetTicketByIdQuery } from '~services/ticket.service';
import execute from '~utils/execute';

export const useGetTicketById = (ticketId: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: [GET_TICKET_BY_ID_QUERY_KEY, ticketId],
    queryFn: () => execute(GetTicketByIdQuery, { ticketId }),
    select: (data) => data.data.ticket,
    enabled: !!ticketId,
  });

  return { data, isLoading };
};
