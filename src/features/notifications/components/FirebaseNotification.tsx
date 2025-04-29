import { Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbarContext } from "../../../contexts/snackBarContext";
import { onMessageListener } from "../../../firebase";
import { memo, useEffect } from "react";
import { FirebaseData } from "../api/types";
export const FirebaseNotification = memo(function FC() {
  const snack = useSnackbarContext();
  const queryClient = useQueryClient();
  useEffect(() => {
    onMessageListener()
      .then(({ data }) => {
        const payloadData = data as FirebaseData;
        snack({
          message: (
            <Stack gap={0}>
              <Typography variant="h5">{payloadData?.title ?? ""}</Typography>
              <Typography variant="body2">{payloadData?.body ?? ""}</Typography>
            </Stack>
          ),
          severity: "info",
          snackBarProps: {
            anchorOrigin: { horizontal: "center", vertical: "top" },
          },
        });
        queryClient.invalidateQueries(["Notification"]);
      })
      .catch((err) => console.log("failed: ", err));
  }, [queryClient, snack]);
  return null;
});
