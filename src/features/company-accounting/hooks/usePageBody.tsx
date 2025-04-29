import { useSearchParams } from "react-router-dom";

import { BranchSelect } from "@/API/branches/type";
import { CompanyAccountingBody } from "@/API/company-accounting/types";
import useObjectSearchParam from "@/hooks/useObjectSearchParam";

const useCompanyAccountingPageBody = (): CompanyAccountingBody => {
  const [searchParams] = useSearchParams();
  const branchId = useObjectSearchParam<BranchSelect>("branch")?.id;
  const isCompanyConfirm = searchParams.get("isCompanyConfirm");
  const isOwnerConfirm = searchParams.get("isOwnerConfirm");
  const body = {
    branchIds: branchId ? [branchId] : null,
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    isCompanyConfirm: isCompanyConfirm ? !!+isCompanyConfirm : null,
    isOwnerConfirm: isOwnerConfirm ? !!+isOwnerConfirm : null,
  };
  return body;
};

export default useCompanyAccountingPageBody;
