import { accountingQueries } from "@/API/accounting/queries";
import PaginationTable from "@/components/tables/PaginationTable";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";
import GenderText from "@/components/typography/GenderText";
import usePageParams from "@/features/accountingTourDetails/usePageParams";
import useIsoToArabicDate from "@/hooks/useIsoToArabicDate";
import { getPage } from "@/utils/apiHelpers";
import { moneyFormatter } from "@/utils/transforms";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const tableHeaders = [
  "الرحلة",
  "اسم الزبون",
  "المبلغ",
  "رقم المقعد",
  "تاريخ الحجز",
  "الجنس",
];

const AccountingTourDetailsTable = () => {
  const params = usePageParams();
  const infiniteQuery = accountingQueries.useTourDetailsInfiniteQuery(params);
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
            <TableCell>{row.tourName}</TableCell>
            <TableCell>{row.customerName}</TableCell>
            <TableCell>{moneyFormatter.format(row.amount)}</TableCell>
            <TableCell>{row.chairNumber}</TableCell>
            <TableCell>{useIsoToArabicDate(row.date)}</TableCell>
            <TableCell>
              <GenderText gender={row.gender} />
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default AccountingTourDetailsTable;
