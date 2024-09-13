/**
 * DTO consisting of chunk of data T and pagination metadata
 */
export interface PaginationResultDto<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}
