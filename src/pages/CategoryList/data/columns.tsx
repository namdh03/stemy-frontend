import { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '~components/common/DataTableColumnHeader';
import { Avatar, AvatarFallback, AvatarImage } from '~components/ui/avatar';
import { Badge } from '~components/ui/badge';
import { ProductCategory } from '~graphql/graphql';

import DataTableRowActions from '../components/DataTableRowActions';

export const columns: ColumnDef<ProductCategory>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Category Name' />,
    cell: ({ row }) => {
      const name = row.original.name;

      return (
        <article className='flex items-center gap-3'>
          <Avatar className='w-8 h-8'>
            <AvatarImage src='https://dummyimage.com/32x32' />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>
          <span className='text-sm font-normal leading-5'>{name}</span>
        </article>
      );
    },
    meta: {
      title: 'Category Name',
    },
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Title' />,
    cell: ({ row }) => {
      const title = row.original.title;

      return (
        <article className='flex items-center gap-2'>
          <span className='text-sm font-normal leading-5'>{title}</span>
        </article>
      );
    },
    meta: {
      title: 'Title',
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />, enableSorting: false, enableHiding: false,
  },
];
