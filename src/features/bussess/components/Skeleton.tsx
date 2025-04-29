import { Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const BussesSkeleton = () => {
  return (
    <Stack
      spacing={0}
      direction="row"
      flexWrap="wrap"
      justifyContent="center"
      sx={{ width: "auto" }}
    >
      <Skeleton sx={{ m: 1 }} variant="rounded" width={240} height={320} />
      <Skeleton sx={{ m: 1 }} variant="rounded" width={240} height={320} />
      <Skeleton sx={{ m: 1 }} variant="rounded" width={240} height={320} />
      <Skeleton sx={{ m: 1 }} variant="rounded" width={240} height={320} />
      <Skeleton sx={{ m: 1 }} variant="rounded" width={240} height={320} />
      <Skeleton sx={{ m: 1 }} variant="rounded" width={240} height={320} />
    </Stack>
  );
};

export default BussesSkeleton;
