import { companyAccountingQueries } from "@/API/company-accounting/queries";
import PaginationTable from "@/components/tables/PaginationTable";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";
import PaymentTypeText from "@/components/typography/PaymentTypeText";
import useCompanyAccountingDetailsPageParams from "@/features/company-accounting-details/usePageParams";
import { getPage } from "@/utils/apiHelpers";
import { moneyFormatter } from "@/utils/transforms";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const CompanyAccountingDetailsTable = () => {
  const params = useCompanyAccountingDetailsPageParams();
  const infiniteQuery =
    companyAccountingQueries.useDetailsInfiniteQuery(params);
  const { data } = infiniteQuery;
  const tableHeaders = [
    "الرحلة",
    "الفرع",
    "اسم الزبون",
    "مبلغ الشركة",
    "مبلغ المالك",
    "طريقة الدفع",
  ];
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
            <TableCell>{row.branchName}</TableCell>
            <TableCell>{row.customerName}</TableCell>
            <TableCell>{moneyFormatter.format(row.companyPrice)}</TableCell>
            <TableCell>{moneyFormatter.format(row.ownerPrice)}</TableCell>
            <TableCell>
              <PaymentTypeText paymentType={row.paymentType} />
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default CompanyAccountingDetailsTable;
