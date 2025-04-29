import { useRef, useState, useEffect } from "react";
import { Box, Paper, Stepper, Step, StepLabel } from "@mui/material";

import PhoneCard from "./cards/PhoneCard";
import SecretCode from "./cards/SecretCode";
import CreateAccount from "./cards/CreateAccount";
import CreateAccount2 from "./cards/CreateAccount2";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import useAnimateCard from "../../hooks/useCardAnimate";
import { AuthPaperSx } from "../AuthLayout/style";

export type Step = {
  num: number;
  state: string;
};

const SignupPage = () => {
  const [step, setStep] = useState({ num: 0, state: "next" });
  const [mobileNumber, setMobileNumber] = useState("");

  const slideContainer = useRef<HTMLDivElement>(null);

  const { state } = useLocation();

  useEffect(() => {
    if (state !== undefined && state !== null) {
      setMobileNumber(state.mobileNumber);
      if (state.step) {
        setStep((prev) => {
          return { ...prev, num: state.step + 1 };
        });
      }
    }
  }, [state]);

  // comment me in order to see what the f*ck I do on the 3rd and 4th signup steps
  useAnimateCard(step, slideContainer);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const handleMobileNumberSuccess = (mobileNumber: string) => {
    setMobileNumber(mobileNumber);
    setStep({ num: 1, state: "next" });
  };

  const handleVerificationSuccess = (data: any) => {
    const redirect = searchParams.get("redirect");
    if (!Object.hasOwn(data, "statusCode")) {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
      } else {
        const search = redirect ? `?redirect=${redirect}` : "";
        setStep({ num: 2, state: "next" });
        navigate(`/signup${search}`, { state: { mobileNumber } });
      }
    }
  };

  const handleFirstRegisterSuccess = (val: number) => {
    if (val === 2) {
      setStep((prev) => {
        return { ...prev, num: 3 };
      });
    }
  };

  const handleSecondRegistration = (data: any) => {
    if (!Object.hasOwn(data, "statusCode")) {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        navigate(`/?tourStatusHome=2&timestamp=Weekly`);
      }
    }
  };

  return (
    <Paper ref={slideContainer} sx={AuthPaperSx}>
      <Box sx={{ width: "100%", mb: 2 }}>
        <Stepper
          activeStep={step.num}
          alternativeLabel
          sx={{ fontSize: "30px" }}
        >
          <Step key={1}>
            <StepLabel />
          </Step>
          <Step key={2}>
            <StepLabel />
          </Step>
          <Step key={3}>
            <StepLabel />
          </Step>
          <Step key={4}>
            <StepLabel />
          </Step>
        </Stepper>
      </Box>
      {step.num === 0 ? (
        <PhoneCard
          slideContainer={slideContainer}
          isRegister={true}
          onSuccess={handleMobileNumberSuccess}
        />
      ) : step.num === 1 ? (
        <SecretCode
          mobileNumber={mobileNumber}
          slideContainer={slideContainer}
          setStep={(val: Step): void => setStep(val)}
          onSuccess={handleVerificationSuccess}
        />
      ) : step.num === 2 ? (
        <CreateAccount
          step={step}
          mobileNumber={mobileNumber}
          slideContainer={slideContainer}
          onSuccess={handleFirstRegisterSuccess}
        />
      ) : (
        <CreateAccount2
          setStep={(val: Step) => setStep(val)}
          slideContainer={slideContainer}
          mobileNumber={mobileNumber}
          onSuccess={handleSecondRegistration}
        />
      )}
    </Paper>
  );
};

export default SignupPage;
