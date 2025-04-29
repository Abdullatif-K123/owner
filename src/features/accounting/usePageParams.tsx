import { AccountingParams } from "@/API/accounting/types";
import useObjectSearchParam from "@/hooks/useObjectSearchParam";
import usePageNumberSearchParam from "@/hooks/usePageNumberSearchParam";
import useQuerySearchParam from "@/hooks/useQuerySearchParam";
import { SelectType } from "@/types/utils";
// import { dateToIso } from "@/utils/transforms";
// import { useSearchParams } from "react-router-dom";

// const currentDate = dateToIso(new Date().toString());

export const useAccountingPageParams = (): AccountingParams => {
  // const [searchParams] = useSearchParams();
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  // const from = searchParams.get("from") ?? currentDate;
  // const to = searchParams.get("to") ?? currentDate;
  const userId = useObjectSearchParam<SelectType>("staff")?.id ?? null;
  const branchId = useObjectSearchParam<SelectType>("branch")?.id ?? null;

  return { query, pageNumber, userId, branchId };
};
export default useAccountingPageParams;
