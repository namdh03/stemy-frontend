import { useCallback, useState } from 'react';

import { ColumnFiltersState, PaginationState, SortingState, Table, VisibilityState } from '@tanstack/react-table';

import DataTable from '~components/common/DataTable';
import { Order } from '~graphql/graphql';
import useDebounce from '~hooks/useDebounce';
import useDocumentTitle from '~hooks/useDocumentTitle';
import useGetOrders from '~hooks/useGetOrders';
import { LayoutBody } from '~layouts/AdminLayout/components/Layout';
import { DEFAULT_DEBOUNCE_TIME, PAGE, TABLE_LIMIT } from '~utils/constants';

import DataTableToolbar from './components/DataTableToolbar';
import { columns } from './data/columns';

function OrderList() {
  useDocumentTitle('Stemy | Order List');

  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);

  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, DEFAULT_DEBOUNCE_TIME);

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGE - 1, //initial page index
    pageSize: TABLE_LIMIT, //default page size
  });

  const { data, isLoading } = useGetOrders({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    price: true,
    description: true,
    categories: true,
  });

  const handleRenderToolbar = useCallback((table: Table<Order>) => {
    return <DataTableToolbar table={table} />;
  }, []);

  return (
    data && (
      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Order List</h2>
            <p className='text-muted-foreground'>These are all orders</p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            isTableDataLoading={isLoading}
            paginatedTableData={data}
            columns={columns}
            pagination={pagination}
            setPagination={setPagination}
            sorting={sorting}
            setSorting={setSorting}
            columnFilters={columnFilters}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            setColumnFilters={setColumnFilters}
            toolbar={handleRenderToolbar}
          />
        </div>
      </LayoutBody>
    )
  );
}

export default OrderList;
