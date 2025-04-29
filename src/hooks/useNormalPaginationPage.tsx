import { getPage } from "@/components/tables/NormalPaginationTable/helpers";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useNormalPaginationPage<T>(data: T[] | undefined) {
  const [searchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(0);
  const page = getPage(data ?? [], pageNumber);

  useEffect(() => {
    setPageNumber(0);
  }, [searchParams]);

  return { page, pageNumber, setPageNumber };
}

export default useNormalPaginationPage;
