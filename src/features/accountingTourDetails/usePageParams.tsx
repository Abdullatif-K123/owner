import { AccountingTourDetailsParams } from "@/API/accounting/types";
import usePageNumberSearchParam from "@/hooks/usePageNumberSearchParam";
import { useParams } from "react-router-dom";

export const usePageParams = (): AccountingTourDetailsParams => {
  const { id, staffId } = useParams();
  const pageNumber = usePageNumberSearchParam();
  return { tourId: id ?? "", pageNumber, ownerStaffId: staffId ?? "" };
};
export default usePageParams;
