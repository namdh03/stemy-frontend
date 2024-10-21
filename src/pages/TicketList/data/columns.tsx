import { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '~components/common/DataTableColumnHeader';
import { Badge } from '~components/ui/badge';
import { Ticket, TicketStatus } from '~graphql/graphql';

import DataTableRowActions from '../components/DataTableRowActions';
import { formatDate } from '~utils/date.util';

export const columns: ColumnDef<Ticket>[] = [
  {
    id: 'index',
    header: 'No.',
    cell: ({ table, row }) => (
      <span className='text-[#71717A]'>
        {row.index + table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Ticket Title' />,
    cell: ({ row }) => {
      const title = row.original.title;

      return (
        <article className='flex items-center gap-3'>
          <span className='text-sm font-normal leading-5'>{title}</span>
        </article>
      );
    },
    meta: {
      title: 'Ticket Title',
    },
    enableHiding: false,
  },
  {
    accessorKey: 'orderId',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Order ID' />,
    cell: ({ row }) => {
      const orderId = row.original.orderItem.order.id;

      return (
        <article className='flex items-center gap-2'>
          <span className='text-sm font-normal leading-5'>{orderId}</span>
        </article>
      );
    },
    meta: {
      title: 'Order ID',
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <article className='flex items-center gap-2'>
          <Badge variant={status === TicketStatus.Open ? 'default' : 'destructive'} className='mr-2'>
            <span className='text-sm font-normal leading-5 block'>{status}</span>
          </Badge>
        </article>
      );
    },
    meta: {
      title: 'Status',
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Category' />,
    cell: ({ row }) => {
      const category = row.original.category?.name;

      return (
        <article className='flex items-center gap-2'>
          <Badge variant='secondary'>{category}</Badge>
        </article>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Created At' />,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;

      return (
        <article className='flex items-center gap-2'>
          <span className='text-sm font-normal leading-5'>{formatDate(createdAt)}</span>
        </article>
      );
    },
  },
  {
    accessorKey: 'sender',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Sender' />,
    cell: ({ row }) => {
      const sender = row.original.sender?.fullName;

      return (
        <article className='flex items-center gap-2'>
          <span className='text-sm font-normal leading-5'>{sender}</span>
        </article>
      );
    },
  },
  {
    accessorKey: 'closedAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Closed At' />,
    cell: ({ row }) => {
      const closedAt = row.original.closedAt;

      return (
        <article className='flex items-center gap-2'>
          <span className='text-sm font-normal leading-5'>{formatDate(closedAt)}</span>
        </article>
      );
    },
  },
  {
    accessorKey: 'replier',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Replier' />,
    cell: ({ row }) => {
      const replier = row.original.replier?.fullName;
      return <span className='text-sm font-normal leading-5'>{replier}</span>;
    },
    enableSorting: false,
    meta: {
      title: 'Replier',
    },
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Rating' />,
    cell: ({ row }) => {
      const rating = row.original.rating;
      return <span className='text-sm font-normal leading-5'>{rating}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
