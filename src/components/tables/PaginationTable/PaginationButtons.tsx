import { TablePagination } from "@mui/material";
import { InfiniteData } from "@tanstack/react-query";
import { Pagination } from "../types";

interface PaginationTableProps {
  data?: InfiniteData<{
    data: Pagination<unknown>;
    pageParam: any;
  }>;
  page: number;
  handleChangePage: (
    event: React.ChangeEvent<unknown> | null,
    newPage: number
  ) => void;
}

const PaginationButtons = ({
  data,
  page,
  handleChangePage,
}: PaginationTableProps) => {
  const isDisabled = !data;

  return handleChangePage !== null ? (
    <TablePagination
      rowsPerPageOptions={[data?.pages[0].data.data?.length ?? 0]}
      labelDisplayedRows={(info) =>
        `${info.from} - ${info.to} من ${info.count}`
      }
      component="div"
      count={data?.pages[0].data.totalDataCount ?? 0}
      rowsPerPage={10}
      page={page > 0 ? page : 0}
      onPageChange={handleChangePage}
      SelectProps={{
        disabled: isDisabled,
      }}
    />
  ) : null;
};

export default PaginationButtons;
