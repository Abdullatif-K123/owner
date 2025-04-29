import { Box, Typography } from "@mui/material";
import { queries } from "../../../API/auth/queries";
import { RegisterationPhoneNumber } from "../../../API/auth/types";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";
import useTimer from "../../../hooks/useTimer";

type Props = {
  mobileNumber: string;
};

const ResendCode = ({ mobileNumber }: Props) => {
  const { timer, timerReset } = useTimer();

  const reSend = queries.useRegisterMobileNumber();
  const snackBar = useAxiosErrorSnackbar();

  const handleReSend = () => {
    const body: RegisterationPhoneNumber = {
      isRegister: false,
      mobileNumber: mobileNumber,
    };
    reSend.mutate(body, {
      onSuccess: () => timerReset(),
      onError: (err) => snackBar(err),
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            color: "primary.main",
          }}
        >
          يمكن إرسال الكود مرة اخرى بعد:
        </Typography>
        <Typography
          component="p"
          color="secondary.main"
          variant="subtitle1"
          sx={{
            my: "auto",
            mx: 1,
          }}
        >
          {timer}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            color: "primary.main",
          }}
        >
          لم تستلم رمز التأكيد:
        </Typography>
        <Typography
          component="p"
          color="secondary.main"
          variant="subtitle1"
          sx={{
            my: "auto",
            mx: 1,
            cursor: "pointer",
            "&:hover": { color: "primary.main" },
          }}
          onClick={handleReSend}
        >
          إعادة إرسال الرمز
        </Typography>
      </Box>
    </Box>
  );
};

export default ResendCode;
