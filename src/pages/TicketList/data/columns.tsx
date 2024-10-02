import { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '~components/common/DataTableColumnHeader';
import { Avatar, AvatarFallback, AvatarImage } from '~components/ui/avatar';
import { Badge } from '~components/ui/badge';
import { Ticket } from '~graphql/graphql';

import DataTableRowActions from '../components/DataTableRowActions';

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
          <Avatar className='w-8 h-8'>
            <AvatarImage src='https://dummyimage.com/32x32' />
            <AvatarFallback>{title}</AvatarFallback>
          </Avatar>
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
      const orderId = row.original.order.id;

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
          <Badge color='blue' className='mr-2'>
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
  // {
  //   accessorKey: 'totalFeedbacks',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Tổng số gói nguyên liệu' />,
  //   cell: ({ row }) => {
  //     const total = row.original.totalFeedbacks;
  //     return <span className='text-sm font-normal leading-5 block ml-16'>{total || 0} gói</span>;
  //   },
  //   meta: {
  //     title: 'Tổng số feedback',
  //   },
  //   enableSorting: false,
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
