import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

import Submit from "@/components/buttons/Submit";
import Loading from "@/components/feedback/Loading";
import SomethingWentWrong from "@/components/feedback/SomethingWentWrong";
import TextFieldControlled from "@/components/inputs/TextFieldControlled";
import {
  tourCustomerDetailsToForm,
  tourCustomerFormToBody,
} from "@/features/reservations/Action/helpers";
import GenderRadio from "@/features/reservations/Action/ReservationForm/GenderRadio";
import TourSeatSelection from "@/features/reservations/Action/TourChairSelection";
import { TourCustomerForm } from "@/features/reservations/Action/ReservationForm/type";
import tourCustomerActionSchema, {
  tourCustomerActionDefault,
} from "@/features/reservations/Action/ReservationForm/validation";
import { toursQueries } from "@/API/tour/queries";
import { TourCustomer } from "@/API/tour/types";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import controllers from "@/constants/controllers";
import BarcodeReader from "@/features/reservations/Action/BarcodeReader";
import { useEffect, useState } from "react";
import { useSnackbarContext } from "@/contexts/snackBarContext";
import DatePickerComp from "@/components/inputs/DatePickerComp";

type Props = {
  tourId: string;
  data?: TourCustomer | null;
  onClose: () => void;
};

const ReservationForm = ({ data, tourId, onClose }: Props) => {
  const [isScanning, setIsScanning] = useState(false);
  const defaultValues = data
    ? tourCustomerDetailsToForm(data)
    : tourCustomerActionDefault;
  const { control, setValue, handleSubmit, watch, trigger } =
    useForm<TourCustomerForm>({
      resolver: yupResolver(tourCustomerActionSchema),
      defaultValues,
    });

  const action = toursQueries.useCustomerAction();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const warningSnackbar = useSnackbarContext();

  const queryClient = useQueryClient();

  const tourQuery = toursQueries.useDetailsForCustomerQuery(tourId);

  const setFirstName = (s: string) => setValue("firstName", s);
  const setLastname = (s: string) => setValue("lastName", s);
  const setFatherName = (s: string) => setValue("fatherName", s);
  const setMotherName = (s: string) => setValue("motherName", s);
  const setRegistration = (s: string) => setValue("city", s);
  const setBirthDate = (s: string) => setValue("birthDate", s);
  const setNationalNumber = (s: string) => setValue("nationalNumber", s);

  const onSubmit = async (form: TourCustomerForm) => {
    const body = tourCustomerFormToBody(form, data ?? null, tourId);

    action.mutate(body, {
      onSuccess: () => {
        successSnackbar(`تم حفظ الحجز بنجاح`);
        queryClient.invalidateQueries([controllers.TOUR, "reservations"]);
        queryClient.invalidateQueries([
          controllers.TOUR,
          "bookedChairs",
          tourId,
        ]);
        onClose();
      },
      onError: (err) => errorSnackbar(err),
    });
  };

  useEffect(() => {
    preventScanner("firstName");
    preventScanner("lastName");
    preventScanner("fatherName");
    preventScanner("motherName");
    preventScanner("nationalNumber");
    preventScanner("phoneNumber");
  }, [watch()]);

  type TourCustomerFormKeys =
    | "firstName"
    | "lastName"
    | "fatherName"
    | "motherName"
    | "nationalNumber"
    | "phoneNumber";

  function preventScanner(field: TourCustomerFormKeys) {
    if (watch(field)?.includes("#")) {
      setValue(field, "");
      warningSnackbar({
        message: "الرجاء الضغط على زر المسح",
        severity: "warning",
      });
    }
  }

  return (
    <form
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          return;
        }
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        alignItems={"start"}
        justifyContent={"space-around"}
        spacing={1}
      >
        <Grid container item xs={12} md={7} spacing={2} my={1}>
          {isScanning && (
            <Grid item xs={12}>
              <Typography
                color="error"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <InfoIcon sx={{ mr: 2, color: "gray" }} />
                الرجاء تغيير اللغة للغة العربية أثناء المسح
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <TextFieldControlled
              control={control}
              name="firstName"
              label="الاسم"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldControlled
              control={control}
              name="lastName"
              label="الكنية"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldControlled
              control={control}
              name="fatherName"
              label="اسم الأب"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldControlled
              control={control}
              name="motherName"
              label="اسم الأم"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldControlled control={control} name="city" label="الخانة" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePickerComp
                  label="تاريخ الميلاد"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldControlled
              control={control}
              name="phoneNumber"
              label="رقم الموبايل"
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldControlled
              control={control}
              name="nationalNumber"
              label="الرقم الوطني"
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldControlled
              control={control}
              name="chairNumber"
              value={watch("chairNumber") || ""}
              label="المقعد"
              required
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldControlled
              disabled={tourQuery.isLoading}
              control={control}
              name="amount"
              label="سعر المقعد"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              sx={{ mx: 0.8, width: "fit-content" }}
              control={
                <Checkbox
                  name="isPaid"
                  onChange={(e) => setValue("isPaid", e.target.checked)}
                  checked={watch("isPaid")}
                  disabled={defaultValues.isPaid}
                />
              }
              label="تم الدفع"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <GenderRadio
                  label="الجنس"
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </Grid>
          <BarcodeReader
            isScanning={isScanning}
            setIsScanning={setIsScanning}
            setFirstName={setFirstName}
            setLastname={setLastname}
            setFatherName={setFatherName}
            setMotherName={setMotherName}
            setRegistration={setRegistration}
            setBirthDate={setBirthDate}
            setNationalNumber={setNationalNumber}
          />

          <Grid
            justifySelf={"end"}
            item
            xs={12}
            justifyContent="center"
            display="flex"
          >
            <Submit
              size="large"
              isSubmitting={action.isLoading}
              disabled={isScanning}
            >
              حفظ
            </Submit>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          {tourQuery.data && (
            <TourSeatSelection
              sx={{ maxHeight: "430px" }}
              currentlyBookedOn={data?.chairNumber}
              selected={watch("chairNumber")}
              onSeatSelection={(seat) => {
                setValue("chairNumber", seat);
                trigger("chairNumber");
              }}
              tour={tourQuery.data}
            />
          )}
          {tourQuery.isLoading && <Loading sx={{ mx: "auto", mt: 10 }} />}
          {tourQuery.isError && (
            <SomethingWentWrong sx={{ mx: "auto", mt: 10 }} />
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default ReservationForm;
