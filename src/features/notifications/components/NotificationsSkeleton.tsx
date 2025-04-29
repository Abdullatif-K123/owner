import { Skeleton, Stack } from "@mui/material";

const NotificationsSkeleton = () => {
  const sx = {
    my: 2,
    p: 2,
    borderRadius: 1,
  };

  return (
    <Stack
      spacing={1}
      sx={{
        mt: 2,
        mx: "auto",
        width: "100%",
        height: 400,
      }}
    >
      <Skeleton sx={sx} variant="rounded" width="100%" height={70} />
      <Skeleton sx={sx} variant="rounded" width="100%" height={70} />
      <Skeleton sx={sx} variant="rounded" width="100%" height={70} />
      <Skeleton sx={sx} variant="rounded" width="100%" height={70} />
    </Stack>
  );
};

export default NotificationsSkeleton;
