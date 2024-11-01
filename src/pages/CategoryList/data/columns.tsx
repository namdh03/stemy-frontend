import { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '~components/common/DataTableColumnHeader';
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
  // {
  //   accessorKey: 'deleted',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title='Deleted' />,
  //   cell: ({ row }) => {
  //     const isDeleted = row.original.isDelete;

  //     return (
  //       <article className='flex items-center gap-2'>
  //         {isDeleted && (
  //           <Badge variant='destructive'>
  //             <span className='text-sm font-normal leading-5'>Deleted</span>
  //           </Badge>
  //         )}
  //       </article>
  //     );
  //   },
  //   meta: {
  //     title: 'Title',
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
