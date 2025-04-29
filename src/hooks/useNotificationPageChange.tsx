import { useSearchParams } from "react-router-dom";

interface HandleChangeProps {
  pages?: any[];
  fetchPreviousPage: () => Promise<any>;
  fetchNextPage: (data?: { pageParam: number }) => Promise<any>;
}
export const useNotificationPageChange = ({
  fetchNextPage,
}: HandleChangeProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return async function (_: React.ChangeEvent<unknown>, newPage: number) {
    searchParams.set("np", newPage.toString());
    setSearchParams(searchParams);
    fetchNextPage({ pageParam: newPage });
    // if (currentPage > newPage && !pages?.[newPage]) {
    //   await fetchPreviousPage();
    // } else if (currentPage < newPage && !pages?.[newPage]) {
    //   await fetchNextPage({});
    // }
  };
};
