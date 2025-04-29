import { accountingQueries } from "@/API/accounting/queries";
import RemoveIconButton from "@/components/buttons/RemoveIconButton";
import PaginationTable from "@/components/tables/PaginationTable";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";
import { useRoleContext } from "@/contexts/RoleContext";
import { useGeneralBoxesContext } from "@/features/GeneralBoxes/context/GeneralBoxesContext";
import GeneralBoxesRowCheckbox from "@/features/GeneralBoxes/RowCheckbox";
import usePageNumberSearchParam from "@/hooks/usePageNumberSearchParam";
import { getPage } from "@/utils/apiHelpers";
import { moneyFormatter } from "@/utils/transforms";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const tableHeaders = ["الاسم", "الوصف", "المبلغ", "خيارات"];

const GeneralBoxesTable = ({ isReceived }: { isReceived: boolean }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = usePageNumberSearchParam();
  const Query = accountingQueries.useGeneralBoxesQuery({
    pageNumber,
    isReceived,
  });
  const page = getPage(Query.data, pageNumber);
  const { isOwner } = useRoleContext();
  const { isSelectionEnabeld } = useGeneralBoxesContext();
  return (
    <PaginationTable
      skeleton
      infiniteQuery={Query}
      tableHead={
        <TableHead>
          <TableRow>
            {isSelectionEnabeld && <TableCell></TableCell>}
            {tableHeaders.map((cellHeader) => (
              <TableCell key={cellHeader}>{cellHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
      }
      pageNumber={pageNumber}
      cellCount={tableHeaders.length + +isSelectionEnabeld}
    >
      <TableBody>
        {page.map((row, index) => (
          <TableRowStriped key={index}>
            {isSelectionEnabeld && (
              <TableCell>
                <GeneralBoxesRowCheckbox boxId={row.id} />
              </TableCell>
            )}
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.description ?? "لا يوجد"}</TableCell>
            <TableCell>{moneyFormatter.format(row.amount)}</TableCell>
            <TableCell>
              <RemoveIconButton
                sx={
                  row.id === "00000000-0000-0000-0000-000000000000" || isOwner
                    ? { opacity: 0.5 }
                    : {}
                }
                disabled={
                  row.id === "00000000-0000-0000-0000-000000000000" || isOwner
                }
                onClick={() => {
                  searchParams.set("id", `${row.id}`);
                  searchParams.set("amount", `${row.amount}`);
                  setSearchParams(searchParams, { replace: true });
                }}
              />
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default GeneralBoxesTable;
