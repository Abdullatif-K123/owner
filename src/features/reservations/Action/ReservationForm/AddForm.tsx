import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import Submit from "@/components/buttons/Submit";
import Loading from "@/components/feedback/Loading";
import SomethingWentWrong from "@/components/feedback/SomethingWentWrong";
import TextFieldControlled from "@/components/inputs/TextFieldControlled";
import GenderRadio from "@/features/reservations/Action/ReservationForm/GenderRadio";
import { TourCustomerListForm } from "@/features/reservations/Action/ReservationForm/type";
import {
  tourCustomerListActionDefault,
  tourCustomerListActionSchema,
} from "@/features/reservations/Action/ReservationForm/validation";
import { toursQueries } from "@/API/tour/queries";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import controllers from "@/constants/controllers";
import BarcodeReader from "@/features/reservations/Action/BarcodeReader";
import { useSnackbarContext } from "@/contexts/snackBarContext";
import DatePickerComp from "@/components/inputs/DatePickerComp";
import MultipleChairSelection from "@/features/reservations/Action/TourChairSelection/MultipleChairSelection";
import { Gender } from "@/constants/enums";

type Props = {
  tourId: string;
  onClose: () => void;
};

const AddForm = ({ tourId, onClose }: Props) => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender>(Gender.Male);
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm<TourCustomerListForm>({
    resolver: yupResolver(tourCustomerListActionSchema),
    defaultValues: { ...tourCustomerListActionDefault, tourId: tourId },
  });

  const action = toursQueries.useCustomerListAction();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const warningSnackbar = useSnackbarContext();

  const queryClient = useQueryClient();

  const tourQuery = toursQueries.useDetailsForCustomerQuery(tourId);

  const setFirstName = (s: string) => setValue("customerFirstName", s);
  const setLastname = (s: string) => setValue("customerLastName", s);
  const setFatherName = (s: string) => setValue("fatherName", s);
  const setMotherName = (s: string) => setValue("motherName", s);
  const setRegistration = (s: string) => setValue("city", s);
  const setBirthDate = (s: string) => setValue("birthDate", s);
  const setNationalNumber = (s: string) =>
    setValue("customerNationalNumber", s);

  const onSubmit = async (form: TourCustomerListForm) => {
    action.mutate(form, {
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
  const firstNameRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    preventScanner("customerFirstName");
    preventScanner("customerLastName");
    preventScanner("fatherName");
    preventScanner("motherName");
    preventScanner("customerNationalNumber");
    preventScanner("customerPhoneNumber");
  }, [watch()]);

  type TourCustomerFormKeys =
    | "customerFirstName"
    | "customerLastName"
    | "fatherName"
    | "motherName"
    | "customerNationalNumber"
    | "customerPhoneNumber";

  function preventScanner(field: TourCustomerFormKeys) {
    if (watch(field)?.includes("#")) {
      setValue(field, "");
      warningSnackbar({
        message: "الرجاء الضغط على زر المسح",
        severity: "warning",
      });
    }
  }

  const { isLoading } = tourQuery;
  useEffect(() => {
    setValue("amount", tourQuery.data?.chairPrice ?? 0);
  }, [isLoading]);
  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);
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
              name="customerFirstName"
              label="الاسم"
              required
              inputRef={firstNameRef}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldControlled
              control={control}
              name="customerLastName"
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
              name="customerPhoneNumber"
              label="رقم الموبايل"
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldControlled
              control={control}
              name="customerNationalNumber"
              label="الرقم الوطني"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="chairs"
              error={!!errors.chairs?.message}
              helperText={errors.chairs?.message ?? ""}
              value={
                watch("chairs")
                  .map((item) => item.chairNumber)
                  .join(",") || ""
              }
              label="المقاعد"
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
                />
              }
              label="تم الدفع"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <GenderRadio
              label="الجنس"
              onChange={(e) => {
                const seats = getValues("chairs").map((el) => {
                  el.gender = +el.gender;
                  return el;
                });

                setValue("chairs", seats);
                setSelectedGender(+e.target.value);
              }}
              value={selectedGender}
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
            <MultipleChairSelection
              selectedChairs={watch("chairs")}
              selectedGender={selectedGender}
              sx={{ maxHeight: "430px" }}
              onSeatSelection={(seats) => {
                setValue("chairs", seats);
                trigger("chairs");
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

export default AddForm;
