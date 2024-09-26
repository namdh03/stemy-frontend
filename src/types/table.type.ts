import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';

import { SuccessResponse } from './response.type';

export interface TableRequestState {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

export interface TableStateData<T> {
  currentPage: number;
  currentIndex: number;
  totalItem: number;
  totalPage: number;
  data: T[];
}

export type TableResponseState<T> = SuccessResponse<TableStateData<T>>;
