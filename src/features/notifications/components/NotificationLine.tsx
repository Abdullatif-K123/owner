import { Stack, Typography } from "@mui/material";
import { Notification } from "../api/types";
import useIsoToArabicDate from "../../../hooks/useIsoToArabicDate";
import NotifyQueries from "../api/queries";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "../../../constants/controllers";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";

type Props = {
  data: Notification;
  isGeneral: boolean;
};

const NotificationLine = ({ data, isGeneral }: Props) => {
  const mutation = NotifyQueries.useSetAsRead();
  const queryClient = useQueryClient();
  const errSnackbar = useAxiosErrorSnackbar();

  const onNotifyClick = () => {
    if (data.isRead) return;
    const params = {
      isGeneral: isGeneral,
      notificationUserId: data.id,
      isAll: false,
    };
    mutation.mutate(params, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.NOTIFICATION, "all"]);
      },
      onError: (err) => {
        errSnackbar(err);
      },
    });
  };

  return (
    <Stack
      key={data.id}
      sx={{
        my: 2,
        p: 2,
        cursor: !data.isRead ? "pointer" : "context-menu",
        borderRadius: 1,
        width: { xs: 220, sm: "100%" },
        backgroundColor: !data.isRead ? "#ddddfc;" : "#fafafa",
      }}
      onClick={onNotifyClick}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography component="h2" variant="subtitle1" color="secondary">
          {data.title}
        </Typography>
        <Typography component="h2" color="" sx={{ fontSize: "10px" }}>
          {useIsoToArabicDate(data.date)}
        </Typography>
      </Stack>
      <Typography component="h2" variant="body2" color="">
        {data.body}
      </Typography>
    </Stack>
  );
};

export default NotificationLine;
