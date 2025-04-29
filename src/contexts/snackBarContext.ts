import { createContext, ReactNode, useContext } from "react";
import { AlertProps, SnackbarProps as MuiSnackProps } from "@mui/material";

export type AlertSeverity = "error" | "warning" | "info" | "success";

export type SnackbarProps = {
  severity: AlertSeverity;
  message: ReactNode | string;
  alertProps?: AlertProps;
  snackBarProps?: MuiSnackProps;
  sx?: any;
};

export type SnackBarContextValue = {
  setSnackbarProps: ({ severity, message }: SnackbarProps) => void;
  handleOpenSnackbar: () => void;
};

export const initialSnackbarState = {
  setSnackbarProps: () => {},
  handleOpenSnackbar: () => {},
};

export const SnackbarContext =
  createContext<SnackBarContextValue>(initialSnackbarState);

export const useSnackbarContext = () => {
  const { setSnackbarProps, handleOpenSnackbar } = useContext(SnackbarContext);
  const showSnackbar = (props: SnackbarProps) => {
    setSnackbarProps(props);
    handleOpenSnackbar();
  };
  return showSnackbar;
};
