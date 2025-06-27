import {
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import PaginationTable from "@/components/tables/PaginationTable";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";
import usePageParams from "../hooks/usePageParams";
import { getPage } from "@/utils/apiHelpers";
import useIsoToArabicDate from "@/hooks/useIsoToArabicDate";
import { moneyFormatter } from "@/utils/transforms";
import CompanyAccountingRowActions from "@/features/company-accounting/Table/RowActions";
import usePageBody from "@/features/company-accounting/hooks/usePageBody";
import { companyAccountingQueries } from "@/API/company-accounting/queries";
import ToggleTourSelectionButton from "@/features/company-accounting/Table/ToggleTourSelectionButton";
import { useLocation } from "react-router-dom";
const CompanyAccountingTable = () => {
  const params = usePageParams();
  const body = usePageBody();
  const location = useLocation();
  const isOnline = location.pathname.includes("online");
  console.log(isOnline);
  const infiniteQuery = isOnline
    ? companyAccountingQueries.useInfiniteQueryCash(params, body)
    : companyAccountingQueries.useInfiniteQuery(params, body);
  const { data } = infiniteQuery;
  const tableHeaders = [
    "الرحلة",
    "الفرع",
    "تاريخ الإنطلاق",
    "تاريخ الوصول",
    "مبلغ الشركة",
    "مبلغ المالك",
    "تأكيد الشركة",
    "تأكيد المالك",
    "خيارات",
  ];
  const page = getPage(data, params.pageNumber ?? 0);
  return (
    <PaginationTable
      skeleton={true}
      cellCount={tableHeaders.length + 1}
      tableHead={
        <TableHead>
          <TableRow>
            {[null, ...tableHeaders].map((cellHeader) => (
              <TableCell key={cellHeader?.toString()}>{cellHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      }
      pageNumber={params.pageNumber ?? 0}
      infiniteQuery={infiniteQuery}
    >
      <TableBody>
        {page.map((row, index) => (
          <TableRowStriped key={index}>
            <ToggleTourSelectionButton
              disabled={row.isOwnerConfirm}
              id={row.tourId}
            />
            <TableCell sx={{ whiteSpace: "nowrap" }}>{row.tourName}</TableCell>
            <TableCell>{row.branchName}</TableCell>
            <TableCell>{`${useIsoToArabicDate(row.tourLeaveDate)}`}</TableCell>
            <TableCell>{`${useIsoToArabicDate(row.tourArriveDate)}`}</TableCell>
            <TableCell>{moneyFormatter.format(row.companyPrice)}</TableCell>
            <TableCell>{moneyFormatter.format(row.ownerPrice)}</TableCell>
            <TableCell>
              <Stack sx={{ alignItems: "center" }}>
                {row.isCompanyConfirm ? (
                  <CheckIcon />
                ) : (
                  <ClearIcon sx={{ color: "secondary.main" }} />
                )}
              </Stack>
            </TableCell>
            <TableCell>
              <Stack sx={{ alignItems: "center" }}>
                {row.isOwnerConfirm ? (
                  <CheckIcon />
                ) : (
                  <ClearIcon sx={{ color: "secondary.main" }} />
                )}
              </Stack>
            </TableCell>
            <TableCell>
              <CompanyAccountingRowActions row={row} />
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default CompanyAccountingTable;
