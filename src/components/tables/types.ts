export interface Pagination<T> {
    pageNumber: number;
    totalPages: number;
    totalDataCount: number;
    data: T[];
  }