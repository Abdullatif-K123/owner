import { accountingQueries } from "@/API/accounting/queries";
import PaginationTable from "@/components/tables/PaginationTable";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";
import AccountingRowAction from "@/features/accounting/Table/RowActions";
import RowCheckbox from "@/features/accounting/Table/RowCheckbox";
import usePageParams from "@/features/accounting/usePageParams";
import useIsoToArabicDate from "@/hooks/useIsoToArabicDate";
import { getPage } from "@/utils/apiHelpers";
import { moneyFormatter } from "@/utils/transforms";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export const tableHeaders = [
  "الرحلة",
  "الحافلة",
  "تاريخ الإنطلاق",
  "الفرع",
  "كمية المدفوع",
  "كمية الكاش",
  "خيارات",
];

const AccountingTable = () => {
  const params = usePageParams();

  const infiniteQuery = accountingQueries.useInfiniteQuery(params);
  const { data } = infiniteQuery;
  const page = getPage(data, params.pageNumber ?? 0);

  return (
    <PaginationTable
      skeleton={true}
      cellCount={tableHeaders.length + 1}
      tableHead={
        <TableHead>
          <TableRow>
            {[null, ...tableHeaders].map((cellHeader) => (
              <TableCell key={cellHeader}>{cellHeader}</TableCell>
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
            <RowCheckbox
              tourId={row.tourId}
              disabled={row.cashedAmount !== 0}
            />
            <TableCell>{row.tourName}</TableCell>
            <TableCell>{row.busName}</TableCell>
            <TableCell>{useIsoToArabicDate(row.leaveDate)}</TableCell>
            <TableCell>{row.branchName}</TableCell>
            <TableCell>{moneyFormatter.format(row.recievedAmount)}</TableCell>
            <TableCell>{moneyFormatter.format(row.cashedAmount)}</TableCell>
            <TableCell>
              <AccountingRowAction row={row} />
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default AccountingTable;
