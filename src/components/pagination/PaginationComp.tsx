import React, { FC } from "react";
import Pagination from "@mui/material/Pagination";

type Props = {
  pagesCount: number;
  page: number;
  handleChangePage: (_: React.ChangeEvent<unknown>, newPage: number) => void;
};

const PaginationComp: FC<Props> = ({ pagesCount, page, handleChangePage }) => {
  return (
    <>
      {pagesCount > 1 ? (
        <Pagination
          sx={{
            width: "fit-content",
            mx: "auto",
            my: 1,
          }}
          count={pagesCount !== 1 ? pagesCount : 0}
          color="primary"
          page={page + 1}
          onChange={(e, pageNum) => handleChangePage(e, pageNum - 1)}
        />
      ) : null}
    </>
  );
};

export default PaginationComp;
