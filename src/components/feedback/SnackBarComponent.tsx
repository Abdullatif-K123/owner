import { ReactNode } from "react";
import { AlertSeverity, SnackbarProps } from "../../contexts/snackBarContext";
import { Alert, AlertProps, AlertTitle, Box, Snackbar } from "@mui/material";

export type Props = {
  key?: any;
  open: boolean;
  onClose: () => void;
  severity: AlertSeverity;
  message: ReactNode | string;
  autoHideDuration?: number;
  alertProps?: AlertProps;
  snackBarProps?: SnackbarProps;
};

const SnackBarComponent = ({
  open,
  onClose,
  severity,
  message,
  autoHideDuration = 4000,
  snackBarProps,
  alertProps,
}: Props) => {
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      open={open}
      onClick={onClose}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      {...snackBarProps}
      sx={{ mx: "auto", width: "fit-content", ...snackBarProps?.sx }}
    >
      <Alert
        severity={severity}
        elevation={5}
        onClose={onClose}
        {...alertProps}
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          mb: 3,
          display: "flex",
          alignItems: "center",
          ...alertProps?.sx,
        }}
      >
        <AlertTitle>
          <Box px={2} textAlign="center">
            {message}
          </Box>
        </AlertTitle>
      </Alert>
    </Snackbar>
  );
};

export default SnackBarComponent;
