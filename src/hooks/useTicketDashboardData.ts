import { useQuery } from '@tanstack/react-query';

import { TICKET_DASHBOARD_QUERY_KEY } from '~constants/user-query-key';
import { Ticket, TicketStatus } from '~graphql/graphql';
import { GetAllTicketsQuery } from '~services/ticket.service';
import execute from '~utils/execute';

const processTicketData = (tickets: Ticket[]) => {
  const ticketCategoryData = tickets.reduce(
    (acc, ticket) => {
      const categoryName = ticket.category.name;
      acc[categoryName] = (acc[categoryName] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const ticketTrendData = tickets.reduce(
    (acc, ticket) => {
      const month = new Date(ticket.createdAt).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const ticketStatusData = tickets.reduce(
    (acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    },
    {} as Record<TicketStatus, number>,
  );

  const replierPerformanceData = tickets.reduce(
    (acc, ticket) => {
      const replierId = ticket.replier.id;
      acc[replierId] = acc[replierId] || { name: ticket.replier.fullName, resolvedTickets: 0, totalTickets: 0 };
      acc[replierId].totalTickets += 1;
      if (ticket.status === TicketStatus.Close) {
        acc[replierId].resolvedTickets += 1;
      }
      return acc;
    },
    {} as Record<string, { name: string; resolvedTickets: number; totalTickets: number }>,
  );

  const averageRating = tickets.reduce((sum, ticket) => sum + (ticket.rating || 0), 0) / tickets.length;

  return {
    ticketCategoryData: Object.entries(ticketCategoryData).map(([name, value]) => ({ name, value })),
    ticketTrendData: Object.entries(ticketTrendData).map(([name, tickets]) => ({ name, tickets })),
    ticketStatusData: Object.entries(ticketStatusData).map(([name, value]) => ({ name, value })),
    replierPerformanceData: Object.values(replierPerformanceData),
    averageRating: averageRating.toFixed(2),
  };
};

export const useTicketDashboardData = () => {
  const { data, isLoading } = useQuery({
    queryKey: [TICKET_DASHBOARD_QUERY_KEY],
    queryFn: async () => {
      const response = await execute(GetAllTicketsQuery);
      return processTicketData(response.data.tickets.items);
    },
  });

  return { data, isLoading };
};
