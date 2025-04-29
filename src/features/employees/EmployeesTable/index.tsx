import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import useQuerySearchParam from "../../../hooks/useQuerySearchParam";
import usePageNumberSearchParam from "../../../hooks/usePageNumberSearchParam";
import useEventSearchParams from "../../../hooks/useEventSearchParams";
import useObjectSearchParam from "../../../hooks/useObjectSearchParam";

import PaginationTable from "../../../components/tables/PaginationTable";
import TableRowStriped from "../../../components/tables/PaginationTable/TableRowStriped";
import ButtonsStack from "../../../components/layout/ButtonsStack";
import EditIconButton from "../../../components/buttons/EditIconButton";
import RemoveIconButton from "../../../components/buttons/RemoveIconButton";

import { OwnerSelect } from "../../../API/branches/type";
import employeesQuery from "../../../API/employees/queries";
import { getPage } from "../../../utils/apiHelpers";
import { useRoleContext } from "../../../contexts/RoleContext";

const tableHeaders = [
  "الاسم",
  "الكنية",
  "اسم المستخدم",
  "الفرع",
  "الرقم",
  "خيارات",
];

const EmployeesTable = () => {
  const query = useQuerySearchParam("q");
  const pageNumber = usePageNumberSearchParam();
  const { edit, remove } = useEventSearchParams();
  const branchId = useObjectSearchParam<OwnerSelect>("branch")?.id ?? null;
  const { isOwner } = useRoleContext();

  const infiniteQuery = employeesQuery.useInfiniteQuery({
    query,
    pageNumber,
    branchId,
  });

  const { data } = infiniteQuery;
  const page = getPage(data, pageNumber);

  return (
    <PaginationTable
      pageNumber={pageNumber}
      infiniteQuery={infiniteQuery}
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
    >
      <TableBody>
        {page.map((row) => (
          <TableRowStriped key={row.id}>
            <TableCell>{row.firstName}</TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.username}</TableCell>
            <TableCell>{row.branch}</TableCell>
            <TableCell>{row.phoneNumber}</TableCell>
            <TableCell>
              {(isOwner || row.canEdit) && (
                <ButtonsStack>
                  <EditIconButton onClick={() => edit(row.id)} />
                  <RemoveIconButton onClick={() => remove(row.id)} />
                </ButtonsStack>
              )}
              {!(isOwner || row.canEdit) && "-"}
            </TableCell>
          </TableRowStriped>
        ))}
      </TableBody>
    </PaginationTable>
  );
};

export default EmployeesTable;
