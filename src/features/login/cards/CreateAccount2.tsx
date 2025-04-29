import React, { FC, useEffect } from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  Slide,
  Stack,
} from "@mui/material";
import DropDownInput from "../components/DropDownInput";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Createaccount2 } from "../../../API/auth/types";
import {
  citiesDefault,
  createAccount2,
  createAccount2Schema,
} from "../validations";
import { yupResolver } from "@hookform/resolvers/yup";
import RadioInput from "../components/RadioInput";
import { queries } from "../../../API/auth/queries";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";

type Step = {
  num: number;
  state: string;
};

type Props = {
  setStep: (val: Step) => void;
  slideContainer: React.RefObject<HTMLDivElement>;
  mobileNumber: string;
  onSuccess: (data: any) => void;
};

const errorStyle = {
  mt: "0rem !important",
  position: "relative",
  left: 10,
  color: "error.main",
};

const CreateAccount2: FC<Props> = ({
  setStep,
  slideContainer,
  mobileNumber,
  onSuccess,
}: Props) => {
  const form = useForm<Createaccount2>({
    resolver: yupResolver<Createaccount2>(createAccount2Schema),
    defaultValues: createAccount2,
  });

  const { register, control, formState, handleSubmit, setValue, watch } = form;
  const { errors } = formState;

  useEffect(() => {
    setValue("ownerMobileNumber", mobileNumber);
  }, [mobileNumber]);

  const { data: citiesData, status: cityStatus } = queries.useCity();
  const cities = cityStatus === "success" ? citiesData : citiesDefault;

  const { status: regionStatus, data: regionsData } = queries.useRegion(
    watch("city")
  );
  const regions = regionStatus === "success" ? regionsData : citiesDefault;

  const mutation = queries.useCreatAccount2();
  const snackBar = useAxiosErrorSnackbar();

  const onSubmit: SubmitHandler<Createaccount2> = (body: Createaccount2) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} justifyContent="start" alignItems="center">
          <Typography
            component="h2"
            sx={{
              typography: { sm: "h4", xs: "h6" },
              color: "primary.main",
              width: "fit-content",
              my: 3,
            }}
          >
            إنشاء حساب
          </Typography>
          <Grid
            container
            rowSpacing={3}
            sx={{
              width: "90%",
              height: "22rem",
              mx: "auto",
              justifyItems: "center",
            }}
          >
            {/* Represents ROW 1 */}
            <Grid item sm={12}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                <Box>
                  <TextField
                    sx={{ mb: { xs: 1.5, sm: 0 } }}
                    label="الاسم الفرع"
                    type="text"
                    {...register("name")}
                  />
                  <Typography sx={errorStyle} component="p" variant="body2">
                    {errors.name?.message}
                  </Typography>
                </Box>
                <Box>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DropDownInput
                        data={cities ? cities : [{ name: "", id: "" }]}
                        label="المدينة"
                        onChange={onChange}
                        value={value}
                        isCity={true}
                      />
                    )}
                  />
                  <Typography sx={errorStyle} component="p" variant="body2">
                    {errors.city?.message}
                  </Typography>
                </Box>
                <Box>
                  <Controller
                    name="regionId"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DropDownInput
                        data={regions ? regions : [{ name: "", id: "" }]}
                        label="المنطقة"
                        onChange={onChange}
                        value={value}
                        isCity={false}
                      />
                    )}
                  />

                  <Typography sx={errorStyle} component="p" variant="body2">
                    {errors.regionId?.message}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Represents ROW 2 */}
            <Grid item sm={12}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                }}
              >
                <Box>
                  <TextField
                    label="موبايل 1"
                    type="tel"
                    sx={{ width: "152px", mb: { xs: 1.5, sm: 0 } }}
                    {...register("phoneNumber")}
                  />
                  <Typography sx={errorStyle} component="p" variant="body2">
                    {errors.phoneNumber?.message}
                  </Typography>
                </Box>
                <Box>
                  <TextField
                    label="موبايل 2"
                    type="tel"
                    sx={{ width: "152px", mb: { xs: 1.5, sm: 0 } }}
                    {...register("anotherPhoneNumber")}
                  />
                  <Typography sx={errorStyle} component="p" variant="body2">
                    {errors.anotherPhoneNumber?.message}
                  </Typography>
                </Box>
                <Box>
                  <TextField
                    label="هاتف 1"
                    type="tel"
                    sx={{ width: "152px", mb: { xs: 1.5, sm: 0 } }}
                    {...register("landLineNumber")}
                  />
                  <Typography sx={errorStyle} component="p" variant="body2">
                    {errors.landLineNumber?.message}
                  </Typography>
                </Box>
                <Box>
                  <TextField
                    label="هاتف 2"
                    type="tel"
                    sx={{ width: "152px", mb: { xs: 1.5, sm: 0 } }}
                    {...register("anotherLandLineNumber")}
                  />
                  <Typography sx={errorStyle} component="p" variant="body2">
                    {errors.anotherLandLineNumber?.message}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Represents ROW 3*/}
            <Grid item sm={12}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "start",
                }}
              >
                <Stack spacing={0.5} width="100%" sx={{ mx: 2 }}>
                  <TextField
                    multiline
                    label="العنوان بالتفصيل"
                    type="text"
                    sx={{ width: "100%", mb: { xs: 1.5, sm: 0 } }}
                    {...register("address")}
                  />
                  <Typography
                    sx={{ ...errorStyle }}
                    component="p"
                    variant="body2"
                  >
                    {errors.address?.message}
                  </Typography>
                </Stack>
                <Box sx={{ ml: 2.5, my: 1.5 }}>
                  <Controller
                    name="genderDiscrimination"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <RadioInput
                        onChange={onChange}
                        label="هل يمكن لشاب أن يحجز بجانب فتاة"
                        values={[true, false]}
                        valuesLabel={["نعم", "لا"]}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Grid>
            <Box
              sx={{
                width: "90%",
                display: "flex",
                flexWrap: "wrap",
                position: "relative",
                pb: { xs: 3 },
                justifyContent: "space-between",
              }}
            >
              <Button
                sx={{ mx: 3 }}
                variant="outlined"
                onClick={() => setStep({ num: 2, state: "prev" })}
              >
                السابق
              </Button>
              <Button type="submit" sx={{ mx: 3 }} variant="contained">
                التالي
              </Button>
            </Box>
          </Grid>
        </Stack>
      </form>
    </Slide>
  );
};

export default CreateAccount2;
