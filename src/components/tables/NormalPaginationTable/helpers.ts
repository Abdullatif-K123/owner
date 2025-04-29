import { PageSize } from "@/components/tables/NormalPaginationTable";

export function getPage<T>(data: T[], pageNumber: number) {
  if (data && data.length <= PageSize) return data;
  if (data && data.length >= pageNumber * PageSize + PageSize)
    return data.slice(pageNumber * PageSize, pageNumber * PageSize + PageSize);
  return data.slice(-1 * (data.length % PageSize));
}
