import { FC, ReactNode, useState } from "react";
import { SnackbarContext, SnackbarProps } from "../contexts/snackBarContext";
import SnackBarComponent from "../components/feedback/SnackBarComponent";

type Props = {
  children: ReactNode;
};

const SnackbarProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    severity: "error",
    message: "",
  });

  const HandleOpenSnackbar = () => {
    setOpen(true);
  };
  const HandleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        setSnackbarProps,
        handleOpenSnackbar: HandleOpenSnackbar,
      }}
    >
      {children}
      <SnackBarComponent
        key={JSON.stringify(snackbarProps)}
        open={open}
        onClose={HandleCloseSnackbar}
        severity={snackbarProps.severity}
        message={snackbarProps.message}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
