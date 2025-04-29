import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Stack, Typography } from "@mui/material";

import PasswordInput from "../../../components/inputs/PasswordInput";
import UsernameInput from "../../../components/inputs/UsernameInput";

import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";

import { API } from "../../../API/auth/apis";
import { LoginUsernamePasswordBody } from "../../../API/auth/types";
import loginSchema, { loginDefault } from "./validation";
import { getFirebaseToken } from "@/firebase";
import { storage } from "../../../utils/storage";
import { AuthPaperSx } from "../../AuthLayout/style";
import RouterLink from "../../../components/links/RouterLink";
import { loadingButtonSx } from "@/features/login/style";
import Submit from "@/components/buttons/Submit";

const EmployeeLoginPage = () => {
  const navigate = useNavigate();
  const errorSnackbar = useAxiosErrorSnackbar();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginUsernamePasswordBody>({
    resolver: yupResolver(loginSchema),
    defaultValues: loginDefault,
  });

  
  const isSupported = () =>
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window;

  const onSubmit = async (body: LoginUsernamePasswordBody) => {
    if (isSupported()) {
       
            const token = (await getFirebaseToken()) ?? "";
            body.fcmToken = token;
            console.log("Testing here ")
     
        }
        console.log(body)
    try {
      const token = await API.loginUsernamePassword(body);
      storage.setToken(token);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      errorSnackbar(err);
    }
  };
  return (
    <Paper sx={AuthPaperSx}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          component="h2"
          color="primary"
          sx={{
            typography: { sm: "h4", xs: "h6" },
            mx: "auto !important",
            textAlign: "center",
          }}
        >
          تسجيل الدخول كموظف
        </Typography>
        <Stack gap={2} mt={5}>
          <UsernameInput control={control} name="userName" />
          <PasswordInput control={control} name="password" />
        </Stack>
        <Box mx="auto" sx={{ my: 2 }} width="fit-content">
          <Submit sx={loadingButtonSx} isSubmitting={isSubmitting}>
            تسجيل الدخول
          </Submit>
        </Box>
        <RouterLink
          href="/login"
          noDecoration
          color="secondary.main"
          variant="subtitle1"
          sx={{
            textAlign: "center",
            display: "block",
            "&:hover": { color: "primary.main" },
          }}
        >
          تسجيل الدخول كمالك
        </RouterLink>
      </form>
    </Paper>
  );
};

export default EmployeeLoginPage;
