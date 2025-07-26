import { useRef, useState } from "react";
import { Box, Paper, Stepper, Step, StepLabel } from "@mui/material";

import PhoneCard from "./cards/PhoneCard";
import SecretCode from "./cards/SecretCode";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RegisterVerification } from "../../API/auth/types";
import { AuthPaperSx } from "../AuthLayout/style";
import RouterLink from "../../components/links/RouterLink";

const LoginPage = () => {
  const [step, setStep] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");

  const slideContainer = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const handleMobileNumberSuccess = (mobileNumber: string) => {
    setMobileNumber(mobileNumber);
    setStep(1);
  };

  const handleVerificationSuccess = (data: RegisterVerification) => {
    const redirect = searchParams.get("redirect");
    if (!Object.hasOwn(data, "statusCode")) {
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("udserKind", data.data.userkind);
        localStorage.setItem("id", data.data.id);
        navigate("/", { replace: true });
      } else {
        const search = redirect ? `?redirect=${redirect}` : "";
        navigate(`/signup${search}`, {
          state: { mobileNumber, step: data.data.step },
        });
      }
    }
  };

  return (
    <Paper ref={slideContainer} sx={AuthPaperSx}>
      <Box sx={{ width: "100%", mb: 2 }}>
        <Stepper activeStep={step} alternativeLabel sx={{ fontSize: "30px" }}>
          <Step key={1}>
            <StepLabel sx={{ height: 1 }} />
          </Step>
          <Step key={2}>
            <StepLabel />
          </Step>
        </Stepper>
      </Box>
      {step === 0 ? (
        <PhoneCard
          slideContainer={slideContainer}
          isRegister={false}
          onSuccess={handleMobileNumberSuccess}
        />
      ) : (
        <SecretCode
          slideContainer={slideContainer}
          mobileNumber={mobileNumber}
          onSuccess={handleVerificationSuccess}
        />
      )}
      <RouterLink
        href="employee"
        noDecoration
        color="secondary.main"
        variant="subtitle1"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 1,
          "&:hover": { color: "primary.main" },
        }}
      >
        تسجيل الدخول كموظف
      </RouterLink>
    </Paper>
  );
};

export default LoginPage;
