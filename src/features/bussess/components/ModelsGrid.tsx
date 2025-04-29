import { Box, Card, Fade, Grid, SxProps } from "@mui/material";
import { Stack } from "@mui/system";
import Error from "../../../components/feedback/Error";
import NoData from "../../../components/feedback/NoData";
import RepeatELement from "../../../components/layout/RepeatElement";
import LabelValue from "../../../components/typography/LabelValue";
import { LoadingProvider } from "../../../contexts/loadingContext";
import useQuerySearchParam from "../../../hooks/useQuerySearchParam";
import { FC, useEffect, useState } from "react";
import { Bus } from "./Bus";
import PaginationComp from "../../../components/pagination/PaginationComp";
import { getPage } from "../../../utils/apiHelpers";
import { useModalPageChange } from "../../../hooks/useModalPageChange";
import useModalPageNumSearchParam from "../../../hooks/useModalPageNumSearchParam";
import bussesQuery from "../../../API/busses/queries";

const sx = {
  container: {
    py: 1,
    px: 2,
  },
} as const satisfies SxProps;

type Props = {
  onIdChange: (val: string) => void;
  onNameChange: (val: string) => void;
  value: string | undefined;
};

const ModelsGrid: FC<Props> = ({ onIdChange, onNameChange, value }) => {
  const query = useQuerySearchParam();
  const pageNumber = useModalPageNumSearchParam();
  const [showComponent, setShowComponent] = useState(false);
  const infiniteQuery = bussesQuery.useInfiniteQuery({
    query,
    pageNumber,
    enablePagination: true,
  });

  const { fetchNextPage, fetchPreviousPage, data } = infiniteQuery;
  useEffect(() => {
    setShowComponent(true);
  }, []);

  const onClick = (
    _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string,
    name: string
  ) => {
    onIdChange(id);
    onNameChange(name);
  };

  const handlePageChange = useModalPageChange({
    fetchNextPage,
    fetchPreviousPage,
    pages: data?.pages,
  });

  const page = getPage(data, pageNumber);

  useEffect(() => {
    if (page.length > 0 && value !== undefined) {
      const item = page.filter((item) => item.id === value);
      const name = item[0] ? item[0].name : "";
      onNameChange(name);
    }
  }, [value]);

  const isEmpty =
    infiniteQuery.isSuccess &&
    infiniteQuery.data?.pages[0].data.data.length === 0;

  return showComponent ? (
    <Fade in={true}>
      <Box>
        {infiniteQuery.isSuccess && (
          <>
            {/* <InfiniteScroll query={infiniteQuery} minHeight={"fit-content"}> */}
            <Grid container spacing={1} sx={sx.container}>
              {page.map((item: any) => (
                <Grid
                  onClick={(e) => onClick(e, item.id, item.name)}
                  item
                  key={item.id}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                >
                  <Card
                    sx={{
                      p: 1,
                      height: { xs: 270, sm: 320 },
                      cursor: "pointer",
                      transition: "normal",
                      transitionDuration: "200ms",
                      border: value === item.id ? "2px solid lightblue " : "",
                      "&:hover": { transform: "scale(1.015)" },
                    }}
                  >
                    <Stack direction="row" gap={1}>
                      <Stack gap={1} flex={1} sx={{ py: 2 }}>
                        <LabelValue label="الاسم" sx={{ fontSize: 10 }}>
                          {item.name}
                        </LabelValue>
                        <LabelValue label="عدد الأعمدة" sx={{ fontSize: 10 }}>
                          {item.columnCount}
                        </LabelValue>
                        <LabelValue label="عدد المقاعد" sx={{ fontSize: 10 }}>
                          {item.chairCount}
                        </LabelValue>
                        <LabelValue label="عدد الباصات" sx={{ fontSize: 10 }}>
                          {item.busCount}
                        </LabelValue>
                      </Stack>
                      <Bus model={item} />
                    </Stack>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <PaginationComp
              pagesCount={infiniteQuery.data?.pages[0].data.totalPages ?? 0}
              page={pageNumber}
              handleChangePage={handlePageChange}
            />
            {isEmpty && <NoData py={1} maxWidth={1} width={400} mx="auto" />}
            {/*  </InfiniteScroll> */}
          </>
        )}
        {infiniteQuery.isInitialLoading && (
          <LoadingProvider value={true}>
            <RepeatELement
              repeat={3}
              container={<Grid container spacing={1} sx={sx.container} />}
            >
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Card sx={{ p: 1, height: 320 }}>
                  <Stack direction="row" gap={1}>
                    <Stack gap={1} flex={1} sx={{ py: 2 }}>
                      <LabelValue
                        skeletonProps={{ widthRange: { min: 40, max: 50 } }}
                        label="الاسم"
                      />
                      <LabelValue
                        skeletonProps={{ widthRange: { min: 25, max: 30 } }}
                        label="عدد الأعمدة"
                      />
                      <LabelValue
                        skeletonProps={{ widthRange: { min: 25, max: 30 } }}
                        label="عدد المقاعد"
                      />
                      <LabelValue
                        skeletonProps={{ widthRange: { min: 25, max: 30 } }}
                        label="عدد الباصات"
                      />
                    </Stack>
                    <Bus skeleton />
                  </Stack>
                </Card>
              </Grid>
            </RepeatELement>
          </LoadingProvider>
        )}
        {infiniteQuery.isError && (
          <Error error={infiniteQuery.error} retry={infiniteQuery.refetch} />
        )}
      </Box>
    </Fade>
  ) : (
    <></>
  );
};

export default ModelsGrid;
