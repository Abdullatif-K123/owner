import LockIcon from "@mui/icons-material/Lock";
import { Button, Stack, Typography } from "@mui/material";
import RouterLink from "../links/RouterLink";

const NoPermission = () => {
  return (
    <Stack alignItems={"center"} py={10} gap={2}>
      <Typography color="error" variant="h4" textAlign={"center"}>
        ممنوع الوصول
      </Typography>
      <LockIcon sx={{ height: "10rem", width: "10rem" }} color="error" />
      <Typography color="primary" variant="h6" textAlign={"center"}>
        ليس لديك وصول لهذه العملية
      </Typography>
      <Button
        component={RouterLink}
        variant="contained"
        href="/"
        sx={{ mt: 2, px: "30px !important" }}
      >
        انتقال للرئيسية
      </Button>
    </Stack>
  );
};
export default NoPermission;
