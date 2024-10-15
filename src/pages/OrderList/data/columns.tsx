import { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '~components/common/DataTableColumnHeader';
import { Badge } from '~components/ui/badge';
import { Order } from '~graphql/graphql';

import DataTableRowActions from '../components/DataTableRowActions';

export const columns: ColumnDef<Order>[] = [
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
    accessorKey: 'orderId',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Order ID' />,
    cell: ({ row }) => {
      const orderId = row.original.id;

      return (
        <article className='flex items-center gap-3'>
          <span className='text-sm font-normal leading-5'>{orderId}</span>
        </article>
      );
    },
    meta: {
      title: 'Order ID',
    },
    enableHiding: false,
  },
  {
    accessorKey: 'user',
    enableHiding: true,
    header: ({ column }) => <DataTableColumnHeader column={column} title='User' />,
    cell: ({ row }) => {
      const user = row.original.fullName;

      return (
        <article className='flex items-center gap-2'>
          <span className='text-sm font-normal leading-5'>{user}</span>
        </article>
      );
    },
    meta: {
      title: 'User',
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Created At' />,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <span className='text-sm font-normal leading-5'>{createdAt}</span>;
    },
    meta: {
      title: 'Created At',
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge className='px-2 py-1 rounded-full text-xs font-semibold'>{status}</Badge>;
    },
    meta: {
      title: 'Status',
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Address' />,
    cell: ({ row }) => {
      const address = row.original.address;

      return (
        <article className='flex items-center gap-2'>
          <span className='text-sm font-normal leading-5'>{address}</span>
        </article>
      );
    },
    meta: {
      title: 'Address',
    },
  },
  {
    accessorKey: 'orderItems',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Order Items' />,
    cell: ({ row }) => {
      const orderItems = row.original.orderItems;
      return (
        <div>
          {orderItems.map((orderItem) => (
            <div key={orderItem.id} className='text-sm font-normal leading-5 block'>
              {orderItem.product.name} x {orderItem.quantity}
            </div>
          ))}
        </div>
      );
    },
    enableSorting: false,
    meta: {
      title: 'Order Items',
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
