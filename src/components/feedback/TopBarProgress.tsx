import { Box, LinearProgress } from "@mui/material";

export const TopBarProgress = () => (
  <Box
    sx={{
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 99999999,
    }}
  >
    <LinearProgress variant="indeterminate" sx={{ padding: 0.4 }} color="primary" />
  </Box>
);
