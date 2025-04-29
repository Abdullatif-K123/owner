import { AccountingDetailsParams } from "@/API/accounting/types";
import usePageNumberSearchParam from "@/hooks/usePageNumberSearchParam";
import useQuerySearchParam from "@/hooks/useQuerySearchParam";
import { useParams } from "react-router-dom";

export const usePageParams = (): AccountingDetailsParams => {
  const { id } = useParams();
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  return { tourId: id ?? "", query, pageNumber };
};
export default usePageParams;
