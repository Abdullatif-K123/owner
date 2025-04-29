import { Box } from "@mui/material";
import Loading from "../../../components/feedback/Loading";

const ChipLoading = () => {
  return (
    <Box sx={{ height: 2, width: 2 }}>
      <Loading />
    </Box>
  );
};

export default ChipLoading;
