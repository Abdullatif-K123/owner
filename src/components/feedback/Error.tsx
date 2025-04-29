import { Navigate } from "react-router-dom";
import { StackProps } from "@mui/material";
import { AxiosError } from "axios";

import { parseBackendError } from "../../utils/apiHelpers";
import ClientError from "./ClientError";
import SomethingWentWrong from "./SomethingWentWrong";

export type ErrorProps = { error: unknown; retry?: () => void } & StackProps;

export const Error = ({ error, retry, ...props }: ErrorProps) => {
  let message;
  let status = 500;
  if (error instanceof AxiosError) {
    message = parseBackendError(error);
    status = error.response?.status ?? status;
  }
  if (status === 403) {
    return <Navigate to="/403" />;
  }
  return status === 500 ? (
    <SomethingWentWrong retry={retry} {...props} />
  ) : (
    <ClientError message={message} retry={retry} {...props} />
  );
};
export default Error;
