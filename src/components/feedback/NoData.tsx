import { Box, Stack, Typography } from "@mui/material";
import { StackProps } from "@mui/system";
import NoDataIcon from "../icons/NoDataIcon";

const NoData = (props: StackProps) => {
  return (
    <Stack alignItems={"stretch"} py={1} gap={1} {...props}>
      <Box sx={{ flex: 1 }}>
        <NoDataIcon />
      </Box>
      <Typography color="primary" variant="h5" textAlign={"center"}>
        لا يوجد بيانات
      </Typography>
    </Stack>
  );
};
export default NoData;
