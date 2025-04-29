import BrowserUpdatedRoundedIcon from "@mui/icons-material/BrowserUpdatedRounded";
import SecurityUpdateRoundedIcon from "@mui/icons-material/SecurityUpdateRounded";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC } from "react";
export type UpdateAppProps = {};
export const UpdateApp: FC<UpdateAppProps> = ({}) => {
  const isDesktop = useMediaQuery(useTheme().breakpoints.up("md"));

  return (
    <Stack
      gap={2}
      alignItems={"center"}
      sx={{
        my: "auto",
        ".MuiSvgIcon-root": {
          fontSize: 140,
        },
      }}
    >
      {isDesktop ? (
        <BrowserUpdatedRoundedIcon />
      ) : (
        <SecurityUpdateRoundedIcon />
      )}
      <Typography color="primary" variant="h5">
        {/* {t("newUpdate")} */}
        يتوفر نسخة جديدة للتطبيق"
      </Typography>
      <Button variant="contained" onClick={() => window.location.reload()}>
        {/* {t("update")} */}
        تحديث التطبيق"
      </Button>
    </Stack>
  );
};
export default UpdateApp;
