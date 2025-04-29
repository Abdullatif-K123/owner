import { ReactNode } from "react";
import { useSnackbarContext } from "../contexts/snackBarContext";
const useSuccessSnackbar = () => {
  const snackbar = useSnackbarContext();
  return function (message: ReactNode) {
    snackbar({ message, severity: "success" });
  };
};
export default useSuccessSnackbar;
