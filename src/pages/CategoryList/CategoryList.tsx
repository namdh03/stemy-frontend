import { useCallback, useEffect, useState } from 'react'
import { ProductCategory } from '~graphql/graphql';
import { LayoutBody } from '~layouts/AdminLayout/components/Layout';
import DataTableToolbar from './components/DataTableToolbar';
import useDocumentTitle from '~hooks/useDocumentTitle';
import { ColumnFiltersState, SortingState, Table } from '@tanstack/react-table';
import useDebounce from '~hooks/useDebounce';
import DataTable from '~components/common/DataTable';
import { columns } from './data/columns';
import useProductCategories from '~hooks/useProductCategories';
import { DEFAULT_DEBOUNCE_TIME } from '~utils/constants';

const CategoryList = () => {
  useDocumentTitle('Stemy | Category List');

  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);

  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, DEFAULT_DEBOUNCE_TIME);

  const { data, isLoading } = useProductCategories();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const handleRenderToolbar = useCallback((table: Table<ProductCategory>) => <DataTableToolbar table={table} />, []);

  return (
    <LayoutBody className='flex flex-col' fixedHeight>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Category List</h2>
          <p className='text-muted-foreground'>These are all categories created</p>
        </div>
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable
          isTableDataLoading={isLoading}
          paginatedTableData={{data}}
          columns={columns}
          sorting={sorting}
          setSorting={setSorting}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          toolbar={handleRenderToolbar}
        />
      </div>
    </LayoutBody>
  );
}

export default CategoryList;
