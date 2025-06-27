import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import PaginationTable from "../../../components/tables/PaginationTable";
import TableRowStriped from "../../../components/tables/PaginationTable/TableRowStriped";
import TourStatusColored from "../components/TourStatusColored";
import RowActions from "./RowActions";

import { getPage } from "../../../utils/apiHelpers";
import { toursQueries } from "../../../API/tour/queries";
import { BranchSelect } from "../../../API/branches/type";
import useObjectSearchParam from "../../../hooks/useObjectSearchParam";
import useIsoToArabicDate from "../../../hooks/useIsoToArabicDate";
import useQuerySearchParam from "../../../hooks/useQuerySearchParam";
import usePageNumberSearchParam from "../../../hooks/usePageNumberSearchParam";
import { TourStatus } from "@/constants/enums";

const TableHeaders = [
  "الاسم",
  "الفرع",
  "الحافلة",
  "عدد الزبائن",
  "تاريخ الانطلاق",
  "تاريخ الوصول",
  "الحالة",
  "خيارات",
];

const ToursTable = () => {
  const [searchParams] = useSearchParams();
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();

  const toursStatusnum = searchParams.get("tourStatus");
  const tourStatus = toursStatusnum ? Number(toursStatusnum) : null;

  const branchId = useObjectSearchParam<BranchSelect>("branch")?.id ?? "";

  const infiniteQuery = toursQueries.useInfiniteQuery(
    {
      query,
      pageNumber,
      tourStatus,
      to: searchParams.get("to") ?? null,
      from: searchParams.get("from") ?? null,
    },
    branchId
  );

  const { data } = infiniteQuery;
  const page = getPage(data, pageNumber);
  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const optionsDay: Intl.DateTimeFormatOptions = { weekday: "long" };
    const dayName = date.toLocaleString("ar-EG", optionsDay);

    const optionsDate: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    // Get the date parts
    const formattedDateParts = date
      .toLocaleString("en-US", optionsDate)
      .split(", ");
    const timePart = formattedDateParts[1]
      .replace(/AM/g, "ص")
      .replace(/PM/g, "م");

    // Extract the date part and rearrange it
    const datePart = formattedDateParts[0].split("/");
    const formattedDate = `${datePart[1]}/${datePart[0]}/${datePart[2]}`;

    const finalFormattedDate = `${dayName}, ${formattedDate}, ${timePart}`;

    return finalFormattedDate.replace(",", "");
  }
  return (
    <>
      <PaginationTable
        pageNumber={pageNumber}
        infiniteQuery={infiniteQuery}
        skeleton={true}
        cellCount={TableHeaders.length}
        tableHead={
          <TableHead>
            <TableRow>
              {TableHeaders.map((cellHeader) => (
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
              <TableCell>{row.branchName}</TableCell>
              <TableCell>{row.busName}</TableCell>
              <TableCell>{`${
                row.chairsCount - row.chairsFreeCount
              }`}</TableCell>
              <TableCell>{`${formatDate(row.leaveDate)}`}</TableCell>
              <TableCell>{`${useIsoToArabicDate(row.arriveDate)}`}</TableCell>
              <TableCell sx={{ width: 0 }}>
                <TourStatusColored tourStatus={row.tourStatus} />
              </TableCell>
              <TableCell>
                <RowActions
                  isFinished={row.tourStatus === TourStatus.Finished}
                  name={row.name}
                  id={row.id}
                  canEdit={row.canEdit}
                  branch={row.branchName}
                  date={row.leaveDate}
                  busName={row.busName}
                  dateofLeave={formatDate(row.leaveDate)}
                  branchId={row.branchId}
                />
              </TableCell>
            </TableRowStriped>
          ))}
        </TableBody>
      </PaginationTable>
    </>
  );
};

export default ToursTable;
