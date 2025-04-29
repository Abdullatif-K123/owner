import { useSearchParams } from "react-router-dom";

interface HandleChangeProps {
  pages?: any[];
  fetchPreviousPage: () => Promise<any>;
  fetchNextPage: (data?: { pageParam: number }) => Promise<any>;
}
export const useHandlePageChange = ({ fetchNextPage }: HandleChangeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return async function (
    _: React.ChangeEvent<unknown> | null,
    newPage: number
  ) {
    searchParams.set("p", newPage.toString());
    setSearchParams(searchParams);
    fetchNextPage({ pageParam: newPage });
    // if (currentPage > newPage && !pages?.[newPage]) {
    //   await fetchPreviousPage();
    // } else if (currentPage < newPage && !pages?.[newPage]) {
    //   await fetchNextPage({});
    // }
  };
};
