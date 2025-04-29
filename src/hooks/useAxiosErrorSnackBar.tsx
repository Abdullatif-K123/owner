import { AxiosError } from "axios";
import { useSnackbarContext } from "../contexts/snackBarContext";
import { parseBackendError } from "../utils/apiHelpers";

const useAxiosErrorSnackbar = () => {
  const snackbar = useSnackbarContext();

  return function (err: unknown) {
    let message = "حصل أمر ما خاطئ";
    if (err instanceof AxiosError) {
      message = parseBackendError(err) ?? message;
    }
    snackbar({ message, severity: "error" });
  };
};
export default useAxiosErrorSnackbar;
