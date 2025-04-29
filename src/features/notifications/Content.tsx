import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import NotifyQueries from "./api/queries";
import { useNotificationPageChange } from "../../hooks/useNotificationPageChange";
import NotifyTabs from "./components/NotifyTabs";
import { getPage } from "../../utils/apiHelpers";
import PaginationComp from "../../components/pagination/PaginationComp";
import useNotificationPageNumSearchParam from "../../hooks/useNotificationPageNumSearchParam";
import { Button, DialogContent, Stack } from "@mui/material";

const NotificationsContent = ({ closeDialog }: { closeDialog: () => void }) => {
  const [isGeneral, setIsGeneral] = useState(false);

  const pageNumber = useNotificationPageNumSearchParam();

  const NotifyInfinite = NotifyQueries.useInfiniteQuery({
    pageNumber,
    isGeneral: isGeneral,
  });
  const { fetchNextPage, fetchPreviousPage, data, isInitialLoading, isError } =
    NotifyInfinite;

  const page = getPage(data, pageNumber);

  const handlePageChange = useNotificationPageChange({
    fetchNextPage,
    fetchPreviousPage,
    pages: data?.pages,
  });

  return (
    <>
      <DialogContent
        sx={{
          position: "relative",
          width: { xs: 280, sm: 520 },
        }}
      >
        <Button
          sx={{
            width: 46,
            height: 46,
            position: "absolute",
            top: 0,
            right: 0,
          }}
          onClick={closeDialog}
        >
          <CloseIcon />
        </Button>
        <Stack
          spacing={2}
          sx={{
            width: "auto",
            mx: "auto",
            alignItems: "center",
            display: "block",
          }}
        >
          <NotifyTabs
            setIsGeneral={(val: boolean) => setIsGeneral(val)}
            data={page}
            handleClose={closeDialog}
            isLoading={isInitialLoading}
            isError={isError}
          />
        </Stack>
      </DialogContent>
      <PaginationComp
        pagesCount={NotifyInfinite.data?.pages[0].data.totalPages ?? 0}
        page={pageNumber}
        handleChangePage={handlePageChange}
      />
    </>
  );
};

export default NotificationsContent;
