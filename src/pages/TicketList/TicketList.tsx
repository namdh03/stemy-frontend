import { useCallback, useState } from 'react';

import { ColumnFiltersState, PaginationState, SortingState, Table, VisibilityState } from '@tanstack/react-table';

import DataTable from '~components/common/DataTable';
import { Ticket } from '~graphql/graphql';
import useDebounce from '~hooks/useDebounce';
import useDocumentTitle from '~hooks/useDocumentTitle';
import useGetTableTickets from '~hooks/useGetTableTickets';
import { LayoutBody } from '~layouts/AdminLayout/components/Layout';
import { DEFAULT_DEBOUNCE_TIME, PAGE, TABLE_LIMIT } from '~utils/constants';

import DataTableToolbar from './components/DataTableToolbar';
import { columns } from './data/columns';

function TicketList() {
  useDocumentTitle('Stemy | Ticket List');

  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'createdAt',
      desc: true,
    },
  ]);

  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, DEFAULT_DEBOUNCE_TIME);

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGE - 1, //initial page index
    pageSize: TABLE_LIMIT, //default page size
  });

  const { data, isLoading } = useGetTableTickets({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination,
  });

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    orderId: true,
    status: true,
    category: true,
    createdAt: true,
    sender: true,
    closedAt: true,
    replier: true,
    rating: true,
  });

  const handleRenderToolbar = useCallback((table: Table<Ticket>) => <DataTableToolbar table={table} />, []);

  return (
    <LayoutBody className='flex flex-col' fixedHeight>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Ticket List</h2>
          <p className='text-muted-foreground'>These are all tickets created</p>
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
  );
}

export default TicketList;
