import { Box, Button, Card, CardActions, Stack } from "@mui/material";
import CardBody from "./components/CardBody";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useEventSearchParams from "../../hooks/useEventSearchParams";
import bussesQuery from "@/API/busses/queries";
import useQuerySearchParam from "../../hooks/useQuerySearchParam";
import usePageNumberSearchParam from "../../hooks/usePageNumberSearchParam";
import { getPage } from "../../utils/apiHelpers";
import useObjectSearchParam from "../../hooks/useObjectSearchParam";
import { OwnerSelect } from "@/API/branches/type";
import BackendImage from "../../components/icons/BackendImage";
import SomethingWentWrong from "../../components/feedback/SomethingWentWrong";
import NoData from "../../components/feedback/NoData";
import BussesSkeleton from "./components/Skeleton";
import PaginationComp from "../../components/pagination/PaginationComp";
import { useHandlePageChange } from "../../components/tables/PaginationTable/useHandlePageChange";

type Props = {
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BussesGrid = ({ setAddOpen, setDeleteOpen }: Props) => {
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();
  const branchId = useObjectSearchParam<OwnerSelect>("branch")?.id ?? null;

  const {
    data,
    isError,
    isInitialLoading,
    isSuccess,
    fetchNextPage,
    fetchPreviousPage,
  } = bussesQuery.useBussesInfiniteQuery({
    body: branchId ? [branchId] : [],
    params: { query, pageNumber },
  });

  const isEmpty = isSuccess && !data.pages[0].data.data?.length;

  const page = getPage(data, pageNumber);
  const handlePageChange = useHandlePageChange({
    fetchNextPage,
    fetchPreviousPage,
    pages: data?.pages,
  });

  const { remove, edit } = useEventSearchParams();
  return (
    <>
      <Stack
        spacing={0}
        direction="row"
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {page.map((item: any, index) => (
          <Card key={index} sx={{ width: 240, height: "auto", m: 1 }}>
            <Box sx={{ height: 140 }}>
              <BackendImage
                sx={{ objectFit: "cover" }}
                url={item?.busPhotoUrl}
                alt="Bus Image"
              />
            </Box>
            <CardBody item={item} />
            {item.canEdit && (
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  size="small"
                  sx={{ color: "primary.main", fontSize: "12px" }}
                  onClick={() => setAddOpen(edit(item.id))}
                >
                  تعديل
                  <EditIcon fontSize="small" sx={{ color: "primary", mx: 1 }} />
                </Button>
                <Button
                  size="small"
                  sx={{ color: "error.main", fontSize: "12px" }}
                  onClick={() => setDeleteOpen(remove(item.id))}
                >
                  حذف
                  <DeleteIcon
                    fontSize="small"
                    sx={{ color: "error.main", mx: 1 }}
                  />
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
      </Stack>
      <Stack sx={{ justifyContent: "center" }}>
        <PaginationComp
          pagesCount={data?.pages[0].data.totalPages}
          handleChangePage={handlePageChange}
          page={pageNumber}
        />
      </Stack>
      {isInitialLoading && <BussesSkeleton />}
      <Box sx={{ mx: "auto !important", my: 1, width: "min(90% ,300px)" }}>
        {isEmpty && <NoData />}
        {isError && <SomethingWentWrong />}
      </Box>
    </>
  );
};
export default BussesGrid;
