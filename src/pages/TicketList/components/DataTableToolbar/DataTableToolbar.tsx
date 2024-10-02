import { RxCross2 } from 'react-icons/rx';

import { Table } from '@tanstack/react-table';

import DataTableViewOptions from '~components/common/DataTableViewOptions';
import { Input } from '~components/ui/input';
import Button from '~layouts/AdminLayout/components/Button';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const columnTitle = table.getAllColumns().find((column) => column.id === 'title');
  const columnOrderId = table.getAllColumns().find((column) => column.id === 'orderId');

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Find by name...'
          value={(columnTitle?.getFilterValue() as string) ?? ''}
          onChange={(event) => columnTitle?.setFilterValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='flex items-end gap-1 h-8 px-2 lg:px-3'
          >
            Xóa bộ lọc
            <RxCross2 size={16} className='mb-[1px]' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} className='w-60' />
    </div>
  );
}
