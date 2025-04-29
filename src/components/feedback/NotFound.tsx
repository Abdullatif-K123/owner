import ErrorIcon from "@mui/icons-material/Error";
import { Stack, Typography } from "@mui/material";
const NotFound = () => {
  return (
    <Stack alignItems={"center"} py={10} gap={1}>
      <ErrorIcon sx={{ height: "10rem", width: "10rem" }} color="error" />
      <Typography color="primary" variant="h5" textAlign={"center"}>
        {/* {t`error.notFound`} */}
        لم يتم العثور على هذه الصفحة 404
      </Typography>
    </Stack>
  );
};
export default NotFound;
