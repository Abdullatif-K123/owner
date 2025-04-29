import { accountingQueries } from "@/API/accounting/queries";
import PaginationTable from "@/components/tables/PaginationTable";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";
import AccountingDetailsRowAction from "@/features/accountingDetails/RowAction";
import usePageParams from "@/features/accountingDetails/usePageParams";
import { getPage } from "@/utils/apiHelpers";
import { moneyFormatter } from "@/utils/transforms";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const tableHeaders = ["الموظف", "كمية المدفوع", "كمية الكاش", "خيارات"];

const AccountingDetailsTable = () => {
  const params = usePageParams();
  const infiniteQuery = accountingQueries.useDetailsInfiniteQuery(params);
  const { data } = infiniteQuery;
  const page = getPage(data, params.pageNumber ?? 0);
  return (
    <PaginationTable
      skeleton={true}
      cellCount={tableHeaders.length}
      tableHead={
        <TableHead>
          <TableRow>
            {tableHeaders.map((cellHeader) => (
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
            <TableCell>{row.fullName}</TableCell>
            <TableCell>{moneyFormatter.format(row.recievedAmount)}</TableCell>
            <TableCell>{moneyFormatter.format(row.cashedAmount)}</TableCell>
            <TableCell>
              <AccountingDetailsRowAction staffId={row.ownerStaffId} />
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default AccountingDetailsTable;
