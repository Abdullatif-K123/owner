import {
  Box,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { CustomerRow } from "./CustomerRow";
import { useReservationsContext } from "../context/ReservationsContext";
import NoData from "@/components/feedback/NoData";
// import PaginationTable from "@/components/tables/PaginationTable";
// import usePageNumberSearchParam from "@/hooks/usePageNumberSearchParam";
// import { getPage } from "@/utils/apiHelpers";
// import { toursQueries } from "@/API/tour/queries";
import Loading from "@/components/feedback/Loading";
import RepeatELement from "@/components/layout/RepeatElement";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";
import { TourCustomer } from "@/API/tour/types";

const TabelHeaders = [
  "صاحب الحجز",
  "رقم موبايل صاحب الحجز",
  "الاسم",
  "الكنية",
  "الجنس",
  "رقم الموبايل",
  "رقم الوطني",
  "المقعد",
  "السعر",
  "تاريخ الحجز",
  "تم الدفع",
  "نوع الدفع",
  "نوع الحجز",
  "اسم الموظف",
];

const ReservationsTable = () => {
  const { reservationsQuery } = useReservationsContext();
  // const pageNumber = usePageNumberSearchParam();
  const page: TourCustomer[] | undefined = reservationsQuery.data?.pages[0]
    ?.data?.data as TourCustomer[] | undefined;
  const isSuccess = reservationsQuery.isSuccess;
  const isLoading = reservationsQuery.isLoading;
  const isEmpty = isSuccess && !page?.length;
  return (
    <Paper
      sx={{
        borderRadius: 2,
        mb: "48px !important",
        overflow: "hidden",
      }}
    >
      <Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {[null, ...TabelHeaders].map((cellHeader) => (
                  <TableCell key={cellHeader}>{cellHeader}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading && (
              <RepeatELement repeat={10} container={<TableBody />}>
                <RepeatELement repeat={15} container={<TableRowStriped />}>
                  <TableCell>
                    <Skeleton height={30} sx={{ m: "auto" }} />
                  </TableCell>
                </RepeatELement>
              </RepeatELement>
            )}
            {page && (
              <TableBody>
                {page &&
                  page.map((row) => (
                    <CustomerRow data={row} key={row.tourCustomerChairId} />
                  ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        <Box sx={{ mx: "auto", my: 1, width: "min(90% ,300px)" }}>
          {isLoading && <Loading />}
          {!page && !isLoading && <NoData />}
          {isEmpty && <NoData />}
        </Box>
      </Stack>
    </Paper>
  );
  // return (
  //   <PaginationTable
  //     tableHead={
  //       <TableHead>
  //         <TableRow>
  //           {[null, ...TabelHeaders].map((cellHeader) => (
  //             <TableCell key={cellHeader}>{cellHeader}</TableCell>
  //           ))}
  //         </TableRow>
  //       </TableHead>
  //     }
  //     skeleton={true}
  //     cellCount={TabelHeaders.length + 1}
  //     pageNumber={pageNumber}
  //     infiniteQuery={reservationsQuery}
  //   >
  //     <TableBody>
  //       {page.map((row) => (
  //         <CustomerRow data={row} key={row.tourCustomerChairId} />
  //       ))}
  //     </TableBody>
  //   </PaginationTable>
  // );
};

export default ReservationsTable;
