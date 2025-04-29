import { FC, ReactElement, ReactNode } from "react";
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHeadProps,
} from "@mui/material";
import { PaperProps } from "@mui/material/Paper";
import { Stack } from "@mui/system";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import Skeleton, { SkeletonProps } from "../feedback/Skeleton";
import SomethingWentWrong from "../feedback/SomethingWentWrong";
import RepeatELement from "../layout/RepeatElement";
import { Pagination } from "./types";
import Loading from "../feedback/Loading";
import NoData from "../feedback/NoData";
import Table from "./TableWithAlign";
import TableRowStriped from "./PaginationTable/TableRowStriped";

type Props = {
  infiniteQuery: UseInfiniteQueryResult<
    {
      data: Pagination<unknown>;
      pageParam: any;
    },
    unknown
  >;
  children: ReactNode;
  pageNumber: number;
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
const TableNoPagination: FC<Props> = ({
  infiniteQuery,
  children,
  // pageNumber,
  skeleton,
  skeletonProps,
  tableHead,
  cellCount,
  rowCount,
  customerMessage,
  // ...props
}) => {
  const { data, isInitialLoading, isSuccess, isError } = infiniteQuery;

  const isEmpty = isSuccess && !data.pages[0].data.data?.length;
  return (
    // <Paper
    //   {...props}
    //   sx={{ borderRadius: 2, mb: 6, overflow: "hidden", ...props.sx }}
    // >
    <Stack sx={{ width: "100%" }}>
      <TableContainer>
        <Table>
          {tableHead}
          {isSuccess && children}
          {isInitialLoading && skeleton && (
            <RepeatELement repeat={rowCount ?? 6} container={<TableBody />}>
              <RepeatELement repeat={cellCount} container={<TableRowStriped />}>
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
        {isInitialLoading && !skeleton && <Loading />}
        {isEmpty && <NoData />}
        {isError && <SomethingWentWrong />}
        {customerMessage}
      </Box>
    </Stack>
    // </Paper>
  );
};

export default TableNoPagination;
