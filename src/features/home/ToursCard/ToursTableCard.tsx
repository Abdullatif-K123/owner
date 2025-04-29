import { useEffect } from "react";
import { toursQueries } from "../../../API/tour/queries";
import { useSearchParams } from "react-router-dom";
import useQuerySearchParam from "../../../hooks/useQuerySearchParam";
import usePageNumberSearchParam from "../../../hooks/usePageNumberSearchParam";
import useObjectSearchParam from "../../../hooks/useObjectSearchParam";
import { BranchSelect } from "../../../API/branches/type";
import useTableHeader from "./useTableHeader";
import { getPage } from "../../../utils/apiHelpers";
import TableNoPagination from "../../../components/tables/TableNoPagination";
import {
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import useIsoToArabicDate from "../../../hooks/useIsoToArabicDate";
import Filter from "./Filter";
import useTourStatusFilter from "../../../hooks/useTourStatusFilter";

import "../index.css";

const ToursTableCard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  const branchId = useObjectSearchParam<BranchSelect>("branch")?.id ?? "";

  let toursStatusnum = searchParams.get("tourStatusHome");
  useEffect(() => {
    if (toursStatusnum === null || toursStatusnum === "") {
      searchParams.set("tourStatusHome", "2");
      setSearchParams(searchParams);
    }
  }, []);

  const tourStatus = toursStatusnum ? Number(toursStatusnum) : null;

  const tourData = toursQueries.useInfiniteQuery(
    {
      query,
      pageNumber,
      tourStatus,
      from: null,
      to: null,
    },
    branchId
  );

  const { data } = tourData;
  const tableHeaders = useTableHeader();
  const page = getPage(data, pageNumber);

  const filterd = useTourStatusFilter(page);

  return (
    <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
      <Stack spacing={2}>
        <Typography
          variant="h5"
          sx={{
            color: "primary.900",
            width: "25%",
            display: "flex",
            alignItems: "center",
            pt: 1,
          }}
        >
          أحدث الرحلات
        </Typography>
        <Filter />
        <TableNoPagination
          pageNumber={pageNumber}
          infiniteQuery={tourData}
          skeleton={true}
          cellCount={tableHeaders.length}
          tableHead={
            <TableHead
              sx={{
                backgroundColor: "#f9f9f9",
                color: "primary",
                borderTop: "1px lightgray solid",
              }}
            >
              <TableRow color="primary">
                {tableHeaders.map((cellHeader) => (
                  <TableCell
                    sx={{
                      color: "#4B7175 !important",
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                      },
                    }}
                    key={cellHeader}
                  >
                    {cellHeader}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          }
        >
          <TableBody>
            {filterd !== undefined &&
              filterd.map((row) => (
                <TableRow sx={{ border: "0px !important" }} key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.branchName}</TableCell>
                  <TableCell>{`${
                    row.chairsCount - row.chairsFreeCount
                  }`}</TableCell>
                  <TableCell>{`${useIsoToArabicDate(
                    row.leaveDate
                  )}`}</TableCell>
                  <TableCell>{`${useIsoToArabicDate(
                    row.arriveDate
                  )}`}</TableCell>
                  {/* <TableCell sx={{ width: 0 }}>
                  <Tooltip title="الحالة">
                    <TourStatusColored tourStatus={row.tourStatus} />
                  </Tooltip>
                </TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </TableNoPagination>
      </Stack>
    </Paper>
  );
};

export default ToursTableCard;
