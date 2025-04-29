import { Stack } from "@mui/material";
import ToursTableCard from "./ToursCard/ToursTableCard";
import homeQueries from "./api/queries";
import { TourStats } from "./StatsCard/TourStats";

const HomePage = () => {
  const homeData = homeQueries.useSelectQuery();
  return (
    <Stack spacing={2}>
      <TourStats
        data={homeData.data !== undefined ? homeData.data?.toursChart : null}
        isLoading={homeData.isLoading}
      />
      <ToursTableCard />
    </Stack>
  );
};

export default HomePage;
