import React, { FC, useEffect } from "react";
import { Box, Typography, Slide, Stack } from "@mui/material";
import PinInput from "../components/PinInput";
import phone from "../../../assets/phone-number-page.svg";
import { useForm, Controller } from "react-hook-form";
import { RegisterVerificationBody } from "../../../API/auth/types";
import { registerVerificationDefault } from "../validations";
import { queries } from "../../../API/auth/queries";
import { getFirebaseToken } from "../../../firebase";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";
import ResendCode from "../components/ResendCode";
import { loadingButtonSx } from "@/features/login/style";
import Submit from "@/components/buttons/Submit";

type Step = {
  num: number;
  state: string;
};

type Props = {
  slideContainer: React.RefObject<HTMLDivElement>;
  setStep?: (val: Step) => void;
  mobileNumber: string;
  onSuccess: (data: any) => void;
};

const SecretCode: FC<Props> = ({
  slideContainer,
  mobileNumber,
  onSuccess,
}: Props) => {
  const form = useForm<RegisterVerificationBody>({
    defaultValues: registerVerificationDefault,
  });
  const { control, handleSubmit } = form;

  useEffect(() => {
    Notification.requestPermission((_permission) => {});
  }, []);

  const mutation = queries.useVerification();
  const { isLoading } = mutation;
  const snackBar = useAxiosErrorSnackbar();

  const isSupported = () =>
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window;

  const onSubmit = async (body: RegisterVerificationBody) => {
    body.mobileNumber = mobileNumber;
    if (isSupported()) {
      if (Notification.permission === "granted") {
        const token = (await getFirebaseToken()) ?? "";
        body.fcmToken = token;
      }
    }

    mutation.mutate(body, {
      onSuccess: (data) => onSuccess(data),
      onError: (err) => snackBar(err),
    });
  };

  return (
    <Slide
      timeout={500}
      direction="right"
      in={true}
      container={slideContainer.current}
    >
      <Stack spacing={0} sx={{ width: "100%" }}>
        <Typography
          component="h2"
          sx={{
            typography: { sm: "h4", xs: "h6" },
            color: "primary.main",
            width: "fit-content",
            mx: "auto",
            mt: 1,
          }}
        >
          أدخل رمز التأكيد
        </Typography>
        <Typography
          component="img"
          src={phone}
          alt="Phone image"
          sx={{ width: "10rem", height: "auto", mt: 3, mx: "auto !important" }}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            justifyContent="space-around"
            alignItems="center"
            width="90%"
            height="16rem"
            sx={{ mx: "auto" }}
          >
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange } }) => (
                <PinInput onChange={onChange} />
              )}
            />
            <Box sx={{ width: "90%" }}>
              <Submit sx={loadingButtonSx} isSubmitting={isLoading} />
            </Box>
            <ResendCode mobileNumber={mobileNumber} />
          </Stack>
        </form>
      </Stack>
    </Slide>
  );
};

export default SecretCode;
