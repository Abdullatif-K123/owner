import { useLocation } from "react-router-dom";
import { Typography, Slide, Stack } from "@mui/material";
import phone from "../../../assets/phone-number-page.svg";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerMobileNumberSchema } from "../validations";
import { queries } from "../../../API/auth/queries";
import { RegisterationPhoneNumber } from "../../../API/auth/types";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";
import MobileInput from "../components/MobileInput";
import RouterLink from "../../../components/links/RouterLink";
import { loadingButtonSx } from "@/features/login/style";
import Submit from "@/components/buttons/Submit";

type Props = {
  slideContainer: React.RefObject<HTMLDivElement>;
  isRegister: boolean;
  onSuccess: (num: string) => void;
};

const PhoneCard = ({ slideContainer, isRegister, onSuccess }: Props) => {
  const { pathname } = useLocation();

  const form = useForm<RegisterationPhoneNumber>({
    resolver: yupResolver(registerMobileNumberSchema),
    defaultValues: { mobileNumber: "", isRegister: pathname === "/signup" },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const mutation = queries.useRegisterMobileNumber();
  const { isLoading } = mutation;
  const snackBar = useAxiosErrorSnackbar();

  const onSubmit: SubmitHandler<any> = async (
    body: RegisterationPhoneNumber
  ) => {
    const unEncrypted = body.mobileNumber;
    mutation.mutate(body, {
      onSuccess: () => onSuccess(unEncrypted),
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
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Typography
          component="h2"
          sx={{
            typography: { sm: "h4", xs: "h6" },
            color: "primary.main",
            width: "fit-content",
            mx: "auto !important",
          }}
        >
          {isRegister ? "إنشاء حساب" : "تسجيل الدخول"}
        </Typography>
        <Typography
          component="img"
          src={phone}
          alt="Phone image"
          sx={{ width: "10rem", height: "auto", mt: 3, mx: "auto !important" }}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "80%", margin: "auto" }}
        >
          <Stack spacing={3}>
            <Controller
              control={control}
              name="mobileNumber"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <MobileInput value={value} onChange={onChange} error={error} />
              )}
            />
            <Typography
              sx={{
                mt: "0rem !important",
                position: "relative",
                left: 10,
                color: "error.main",
              }}
              component="p"
              variant="body2"
            >
              {errors.mobileNumber?.message}
            </Typography>
            <Submit sx={loadingButtonSx} isSubmitting={isLoading} />
            <Stack direction="row" justifyContent="center">
              <Typography
                variant="subtitle1"
                component="p"
                color="primary.main"
              >
                {isRegister ? "لديك حساب؟" : "ليس لديك حساب بعد ؟"}
              </Typography>
              <RouterLink
                noDecoration
                href={isRegister ? "/login" : "/signup"}
                underline="none"
                color="secondary.main"
                variant="subtitle1"
                sx={{
                  my: "auto",
                  mx: 1,
                  "&:hover": { color: "primary.main" },
                }}
              >
                {isRegister ? "تسجيل دخول" : "إنشاء حساب"}
              </RouterLink>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Slide>
  );
};

export default PhoneCard;
