import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHeadProps,
} from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";
import { Stack } from "@mui/system";
import Skeleton, { SkeletonProps } from "@/components/feedback/Skeleton";
import SomethingWentWrong from "@/components/feedback/SomethingWentWrong";
import RepeatELement from "@/components/layout/RepeatElement";
import { ReactElement, ReactNode } from "react";
import Loading from "@/components/feedback/Loading";
import NoData from "@/components/feedback/NoData";
import Table from "../TableWithAlign";
import PaginationButtons from "./PaginationButtons";
import { UseQueryResult } from "@tanstack/react-query";
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped";

export const PageSize = 10;

type Props = {
  query: UseQueryResult<unknown[]>;
  children: ReactNode;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  tableHead: ReactElement<TableHeadProps>;
  customerMessage?: ReactNode;
} & PaperProps &
  (
    | {
        skeleton?: true;
        cellCount: number;
        rowCount?: number;
        skeletonProps?: SkeletonProps;
      }
    | {
        skeleton?: false;
        cellCount?: undefined;
        rowCount?: undefined;
        skeletonProps?: undefined;
      }
  );
const NormalPaginationTable = ({
  query,
  children,
  skeleton,
  skeletonProps,
  tableHead,
  cellCount,
  rowCount,
  customerMessage,
  page,
  setPage,
  ...props
}: Props) => {
  const isEmpty = query.isSuccess && !query.data?.length;
  return (
    <Paper
      {...props}
      sx={{
        borderRadius: 2,
        mb: "48px !important",
        overflow: "hidden",
        ...props.sx,
      }}
    >
      <Stack>
        <TableContainer>
          <Table>
            {tableHead}
            {query.isSuccess && children}
            {query.isLoading && skeleton && (
              <RepeatELement repeat={rowCount ?? 6} container={<TableBody />}>
                <RepeatELement
                  repeat={cellCount}
                  container={<TableRowStriped />}
                >
                  <TableCell>
                    <Skeleton
                      widthRange={{ min: 20, max: 40 }}
                      height={30}
                      sx={{ m: "auto" }}
                      {...skeletonProps}
                    />
                  </TableCell>
                </RepeatELement>
              </RepeatELement>
            )}
          </Table>
        </TableContainer>
        <Box sx={{ mx: "auto", my: 1, width: "min(90% ,300px)" }}>
          {query.isLoading && !skeleton && <Loading />}
          {isEmpty && <NoData />}
          {query.isError && <SomethingWentWrong />}
          {customerMessage}
        </Box>
        {query.data?.length !== 0 && (
          <PaginationButtons
            page={page}
            handleChangePage={(_: any, newPage: number) => {
              setPage(newPage);
            }}
            data={query.data}
          />
        )}
      </Stack>
    </Paper>
  );
};

export default NormalPaginationTable;
