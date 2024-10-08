/**
 * Chunk of data T containing pagination metadata
 */
export interface PaginationResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
}
