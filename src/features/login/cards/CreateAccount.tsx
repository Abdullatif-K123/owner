import React, { FC } from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  Slide,
  Stack,
} from "@mui/material";
import RadioInput from "../components/RadioInput";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createAccount1, createAccount1Schema } from "../validations";
import { Createaccount1 } from "../../../API/auth/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { queries } from "../../../API/auth/queries";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";

type Step = {
  num: number;
  state: string;
};

type Props = {
  step: Step;
  slideContainer: React.RefObject<HTMLDivElement>;
  onSuccess: (val: number) => void;
};

const errorStyle = {
  mt: "0rem !important",
  position: "relative",
  left: 10,
  color: "error.main",
};

const CreateAccount: FC<Props> = ({
  step,
  slideContainer,
  onSuccess,
}: Props) => {
  const form = useForm<Createaccount1>({
    resolver: yupResolver<Createaccount1>(createAccount1Schema),
    defaultValues: createAccount1,
  });
  const { control, register, handleSubmit, formState } = form;
  const { errors } = formState;
  const mutation = queries.useCreatAccount1();
  const snackBar = useAxiosErrorSnackbar();

  const onSubmit: SubmitHandler<any> = async (body: Createaccount1) => {
    // body.mobileNumber = mobileNumber;
    console.log("body But in componenet", body);
    mutation.mutate(body, {
      onSuccess: (val: any) => onSuccess(val),
      onError: (err) => snackBar(err),
    });
  };

  return (
    <Slide
      timeout={500}
      direction={`${step.state === "next" ? "right" : "left"}`}
      in={true}
      container={slideContainer.current}
    >
      <Stack spacing={4} sx={{ width: "100%" }}>
        <Typography
          component="h2"
          sx={{
            typography: { sm: "h4", xs: "h6" },
            color: "primary.main",
            width: "fit-content",
            mx: "auto !important",
          }}
        >
          إنشاء حساب
        </Typography>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            sx={{
              width: "100%",
              height: { xs: "26rem", sm: "18rem" },
              mx: "auto !important",
            }}
          >
            {/* Represents a row */}
            <Stack
              spacing={2}
              direction="column"
              sx={{
                width: { xs: "80%", sm: "60%" },
                height: "auto",
                mx: "auto",
                justifyContent: "center",
              }}
            >
              <TextField
                id="outlined-search"
                label="الاسم الأول"
                type="text"
                className="logIn"
                {...register("firstName")}
              />
              {/* ERROR MESSAGE */}
              <Typography sx={errorStyle} component="p" variant="body2">
                {errors.firstName?.message}
              </Typography>
              <TextField
                id="outlined-search"
                label="الاسم الأخير"
                type="text"
                {...register("lastName")}
              />
              <Typography sx={errorStyle} component="p" variant="body2">
                {errors.lastName?.message}
              </Typography>

              {/* <Typography sx={errorStyle} component="p" variant="body2">
                {errors.mobileNumber?.message}
              </Typography> */}
              <Controller
                name="gender"
                control={control}
                render={({ field: { onChange } }) => (
                  <RadioInput
                    onChange={onChange}
                    label="الجنس"
                    values={[0, 1]}
                    valuesLabel={["ذكر", "أنثى"]}
                  />
                )}
              />
              <Typography sx={errorStyle} component="p" variant="body2">
                {errors.gender?.message}
              </Typography>
            </Stack>
          </Grid>
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Button sx={{ mx: 3 }} variant="outlined">
              السابق
            </Button>
            <Button sx={{ mx: 3 }} variant="contained" type="submit">
              التالي
            </Button>
          </Box>
        </form>
      </Stack>
    </Slide>
  );
};

export default CreateAccount;
