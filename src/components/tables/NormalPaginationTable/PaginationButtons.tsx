import { PageSize } from "@/components/tables/NormalPaginationTable";
import { TablePagination } from "@mui/material";

interface PaginationTableProps {
  data?: unknown[];
  page: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
}

const PaginationButtons = ({
  data,
  page,
  handleChangePage,
}: PaginationTableProps) => {
  const isDisabled = !data;
  return (
    <TablePagination
      rowsPerPageOptions={[data?.length ?? 0]}
      labelDisplayedRows={({ from, to, count }) =>
        `${from} - ${to} من ${count}`
      }
      component="div"
      count={data?.length ?? 0}
      rowsPerPage={PageSize}
      page={page}
      onPageChange={handleChangePage}
      SelectProps={{
        disabled: isDisabled,
      }}
    />
  );
};

export default PaginationButtons;
