import { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@mui/material";
// import InfoIcon from "@mui/icons-material/Info";

import Submit from "@/components/buttons/Submit";
import TextFieldControlled from "@/components/inputs/TextFieldControlled";
// import BarcodeReader from "@/features/reservations/Action/BarcodeReader";
// import { useSnackbarContext } from "@/contexts/snackBarContext";
import DatePickerComp from "@/components/inputs/DatePickerComp";
import { CustomerBody } from "@/features/security-list/Action/AddToListForm/type";
import {
  CustomerBodyDefault,
  CustomerBodySchema,
} from "@/features/security-list/Action/AddToListForm/validation";
import { TourCustomer } from "@/API/tour/types";
import { getCustomerAsTourCustomer } from "@/features/security-list/helper";

type Props = {
  onClose: () => void;
  setList: Dispatch<SetStateAction<TourCustomer[]>>;
};

const AddToListForm = ({ onClose, setList }: Props) => {
  // const [isScanning, setIsScanning] = useState(false);

  const { control, handleSubmit /*setValue, watch */ } = useForm<CustomerBody>({
    resolver: yupResolver(CustomerBodySchema),
    defaultValues: CustomerBodyDefault,
  });

  // const warningSnackbar = useSnackbarContext();

  // const setFirstName = (s: string) => setValue("firstName", s);
  // const setLastname = (s: string) => setValue("lastName", s);
  // const setFatherName = (s: string) => setValue("fatherName", s);
  // const setMotherName = (s: string) => setValue("motherName", s);
  // const setRegistration = (s: string) => setValue("city", s);
  // const setBirthDate = (s: string) => setValue("birthDate", s);
  // const setNationalNumber = (s: string) => setValue("nationalNumber", s);

  const onSubmit = async (body: CustomerBody) => {
    setList((prev) => {
      const newList = [...prev, getCustomerAsTourCustomer(body)];
      return newList.sort((a, b) => {
        if (a.chairNumber === 0) return 1;
        if (b.chairNumber === 0) return -1;
        return a.chairNumber > b.chairNumber ? 1 : -1;
      });
    });
    onClose();
  };

  // useEffect(() => {
  //   preventScanner("firstName");
  //   preventScanner("lastName");
  //   preventScanner("fatherName");
  //   preventScanner("motherName");
  //   preventScanner("nationalNumber");
  // }, [watch()]);

  // type TourCustomerFormKeys =
  //   | "firstName"
  //   | "lastName"
  //   | "fatherName"
  //   | "motherName"
  //   | "nationalNumber";

  // function preventScanner(field: TourCustomerFormKeys) {
  //   if (watch(field)?.includes("#")) {
  //     setValue(field, "");
  //     warningSnackbar({
  //       message: "الرجاء الضغط على زر المسح",
  //       severity: "warning",
  //     });
  //   }
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        alignItems={"start"}
        justifyContent={"space-around"}
        spacing={2}
        paddingTop={2}
      >
        {/* {isScanning && (
          <Grid item xs={12}>
            <Typography
              color="error"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <InfoIcon sx={{ mr: 2, color: "gray" }} />
              الرجاء تغيير اللغة للغة العربية أثناء المسح
            </Typography>
          </Grid>
        )} */}
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
                sx={{ width: "100%" }}
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
            name="nationalNumber"
            label="الرقم الوطني"
          />
        </Grid>
        <Grid item xs={12}>
          <TextFieldControlled
            required
            control={control}
            name="chairNumber"
            label="المقعد"
          />
        </Grid>
        {/* <Grid item xs={12} mt={3}>
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
        </Grid> */}

        <Grid
          justifySelf={"end"}
          item
          xs={12}
          gap={2}
          justifyContent="center"
          display="flex"
        >
          <Submit size="large" /*disabled={isScanning}*/>إضافة</Submit>
          <Button size="large" variant="outlined" onClick={onClose}>
            إلغاء
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddToListForm;
