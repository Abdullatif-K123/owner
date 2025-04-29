import React, { useState } from "react";
import { Badge, Dialog, Slide } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { TransitionProps } from "@mui/material/transitions";
import NotificationsContent from "@/features/notifications/Content";
import NotifyQueries from "./api/queries";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NotificationsModal = () => {
  const { data } = NotifyQueries.useNotificationCount();
  const [notifyOpen, setNotifyOpen] = useState(false);
  const handleClose = () => {
    setNotifyOpen(false);
  };
  
  const handleOpen = () => {
    setNotifyOpen(true);
  };

  return (
    <>
      <Badge
        sx={{
          direction: "rtl",
          my: "auto",
          height: "fit-content",
          cursor: "pointer",
        }}
      badgeContent={data || 0}
        color="error"
        onClick={handleOpen}
      >
        <NotificationsIcon style={{ color: "#fff" }} />
      </Badge>

      <Dialog
        open={notifyOpen}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xl"
      >
        <NotificationsContent closeDialog={handleClose} />
      </Dialog>
    </>
  );
};

export default NotificationsModal;
