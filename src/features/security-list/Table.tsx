import {
  Box,
  Paper,
  Skeleton,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";
import { Navigate, useParams } from "react-router-dom";
import { toursQueries } from "@/API/tour/queries";
import Error from "@/components/feedback/Error";
import useIsoToArabicDate from "@/hooks/useIsoToArabicDate";
import RepeatELement from "@/components/layout/RepeatElement";
import NoData from "@/components/feedback/NoData";
import Table from "@/components/tables/TableWithAlign";
import { Dispatch, SetStateAction, useEffect } from "react";
import { TourCustomer } from "@/API/tour/types";
import ButtonsStack from "@/components/layout/ButtonsStack";
import RemoveIconButton from "@/components/buttons/RemoveIconButton";

const TabelHeaders = [
  "المقعد",
  " الاسم والشهرة",
  "اسم الام",
  "اسم الأب",
  "تولد",
  "رقم الهوية",
  "مكان القيد",
  "خيارات",
];

type Props = {
  setList: Dispatch<SetStateAction<TourCustomer[]>>;
  list: TourCustomer[];
};
const SecurityListTable = ({ list, setList }: Props) => {
  const { id } = useParams();
  const { data, isInitialLoading, isError, error, isSuccess, refetch } =
    toursQueries.useCustomersListQuery(id ?? "");

  useEffect(() => {
    if (data) setList(data); 
  }, [data]);

  if (!id) return <Navigate to="/tours" />;
  const isEmpty = isSuccess && data && data.length === 0;
  return (
    <Paper
      sx={{
        borderRadius: 2,
        mb: "48px !important",
        overflow: "hidden",
      }}
    >
      <TableContainer>
        <Table>
          {isInitialLoading && (
            <RepeatELement repeat={10} container={<TableBody />}>
              <RepeatELement
                repeat={TabelHeaders.length}
                container={<TableRowStriped />}
              >
                <TableCell>
                  <Skeleton height={30} sx={{ m: "auto" }} />
                </TableCell>
              </RepeatELement>
            </RepeatELement>
          )}

          <TableHead>
            <TableRow>
              {TabelHeaders.map((cellHeader) => (
                <TableCell key={cellHeader}>{cellHeader}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess &&
              list.map((row, idx) => (
                <TableRowStriped key={idx}>
                  <TableCell>
                    {row.chairNumber === 0 ? "" : row.chairNumber}
                  </TableCell>
                  <TableCell>
                    {row.firstName} {row.lastName}
                  </TableCell>
                  <TableCell>{row.fatherName}</TableCell>
                  <TableCell>{row.motherName}</TableCell>
                  <TableCell>
                    {row.birthDate === "0001-01-01T00:00:00"
                      ? ""
                      : useIsoToArabicDate(row.birthDate, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{row.nationalNumber}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>
                    <ButtonsStack>
                      <RemoveIconButton
                        onClick={() => {
                          setList((prev) => {
                            const newList = prev.filter((_, i) => i !== idx);
                            return newList;
                          });
                        }}
                      />
                    </ButtonsStack>
                  </TableCell>
                </TableRowStriped>
              ))}
            {list.length === 0 && (
              <TableCell colSpan={8}>
                <Box sx={{ mx: "auto", my: 1, width: "min(90% ,300px)" }}>
                  <NoData />
                </Box>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mx: "auto", my: 1, width: "min(90% ,300px)" }}>
        {isError && <Error error={error} retry={refetch} />}
        {isEmpty && <NoData />}
      </Box>
    </Paper>
  );
};

export default SecurityListTable;
