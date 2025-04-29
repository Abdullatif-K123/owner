import { CompanyAccountingParams } from "@/API/company-accounting/types";
import usePageNumberSearchParam from "../../../hooks/usePageNumberSearchParam";
import useQuerySearchParam from "../../../hooks/useQuerySearchParam";

export const usePageParams = (): CompanyAccountingParams => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();

  return { query, pageNumber };
};
export default usePageParams;
