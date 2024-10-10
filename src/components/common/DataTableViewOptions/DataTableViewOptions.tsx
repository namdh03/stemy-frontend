import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { RowData, Table } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '~components/ui/dropdown-menu';
import Button from '~layouts/AdminLayout/components/Button';
import { cn } from '~lib/utils';

import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    title?: string;
  }
}

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  className?: string;
}

export default function DataTableViewOptions<TData>({ table, className }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          Xem
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className={cn('w-[150px]', className)}>
        <DropdownMenuLabel>Hiển thị cột</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize cursor-pointer'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  console.log('column', column);
                  column.toggleVisibility(!!value);
                }}
              >
                {column.columnDef.meta?.title ?? column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
