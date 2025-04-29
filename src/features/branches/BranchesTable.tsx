import { useSearchParams } from "react-router-dom";
import React, { FC } from "react";

import useQuerySearchParam from "../../hooks/useQuerySearchParam";
import PaginationTable from "../../components/tables/PaginationTable";
import usePageNumberSearchParam from "../../hooks/usePageNumberSearchParam";
import useEventSearchParams from "../../hooks/useEventSearchParams";
import useObjectSearchParam from "../../hooks/useObjectSearchParam";
import branchQueries from "../../API/branches/queries";
import useTableHeader from "./useTableHeader";
import { getPage } from "../../utils/apiHelpers";
import {
  Rating,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import ButtonsStack from "../../components/layout/ButtonsStack";
import RecordTypeColored from "../../components/typography/RecordTypeColored";
import RemoveIconButton from "../../components/buttons/RemoveIconButton";
import EditIconButton from "../../components/buttons/EditIconButton";
import TableRowStriped from "../../components/tables/PaginationTable/TableRowStriped";

import { OwnerSelect } from "../../API/branches/type";
import { RegionSelect } from "@/API/branches/type";
import { useRoleContext } from "../../contexts/RoleContext";

type Props = {
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BranchesTable: FC<Props> = ({ setAddOpen, setDeleteOpen }) => {
  const [searchParams] = useSearchParams();
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();

  const ownerId = useObjectSearchParam<OwnerSelect>("owner")?.id ?? null;
  const cityId = useObjectSearchParam<RegionSelect>("city")?.id ?? null;

  const recordTypeString = searchParams.get("recordType");
  const recordType = recordTypeString ? Number(recordTypeString) : null;

  const { remove, edit } = useEventSearchParams();
  const infiniteQuery = branchQueries.useInfiniteQuery(
    {
      query,
      pageNumber,
      cityId,
      enablePagination: true,
    },
    { ownerId, recordType }
  );

  const { data } = infiniteQuery;
  const tableHeaders = useTableHeader();
  const page = getPage(data, pageNumber);

  const { isOwner } = useRoleContext();

  return (
    <>
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
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{`${row.city} - ${row.region}`}</TableCell>
              <TableCell>{row.bussesCount}</TableCell>
              <TableCell>
                <Rating
                  sx={{ "& .MuiRating-icon path": { color: "gold" } }}
                  name="read-only"
                  value={row.rate}
                  precision={0.5}
                  readOnly
                />
              </TableCell>
              <TableCell sx={{ width: 0 }}>
                <Tooltip title="الحالة">
                  <RecordTypeColored
                    clickable={false}
                    recordType={row.recordType}
                  />
                </Tooltip>
              </TableCell>
              <TableCell>
                {isOwner && (
                  <ButtonsStack>
                    <EditIconButton onClick={() => setAddOpen(edit(row.id))} />
                    <RemoveIconButton
                      onClick={() => setDeleteOpen(remove(row.id))}
                    />
                  </ButtonsStack>
                )}
                {!isOwner && "-"}
              </TableCell>
            </TableRowStriped>
          ))}
        </TableBody>
      </PaginationTable>
    </>
  );
};

export default BranchesTable;
