import { ColumnDef } from '@tanstack/react-table';

import DataTableColumnHeader from '~components/common/DataTableColumnHeader';
import { Avatar, AvatarFallback, AvatarImage } from '~components/ui/avatar';
import { Badge } from '~components/ui/badge';
import { Product } from '~graphql/graphql';

import DataTableRowActions from '../components/DataTableRowActions';

export const columns: ColumnDef<Product>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title='Product Name' />,
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
      title: 'Product Name',
    },
    enableHiding: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Price' />,
    cell: ({ row }) => {
      const price = row.original.price;

      return (
        <article className='flex items-center gap-2'>
          <span className='text-sm font-normal leading-5'>{price} VNĐ</span>
        </article>
      );
    },
    meta: {
      title: 'Price',
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Description' />,
    cell: ({ row }) => {
      const description = row.original.description;

      return (
        <article className='flex items-center gap-2'>
          <span className='text-sm font-normal leading-5'>{description}</span>
        </article>
      );
    },
    meta: {
      title: 'Description',
    },
  },
  {
    accessorKey: 'categories',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Categories' />,
    cell: ({ row }) => {
      const categories = row.original.categories;
      return (
        <div>
          {categories.map((category) => (
            <Badge key={category.id} color='blue' className='mr-2'>
              <span key={category.id} className='text-sm font-normal leading-5 block'>
                {category.name}
              </span>
            </Badge>
          ))}
        </div>
      );
    },
    enableSorting: false,
    meta: {
      title: 'Categories',
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
