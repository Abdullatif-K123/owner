import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  DialogActions,
} from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "../../../../constants/controllers";
import { AddTourBody, TourCitiesObj } from "../../../../API/tour/types";
import { addTour, addTourSchema } from "../../validations";
import { toursQueries } from "../../../../API/tour/queries";
import bussesQuery from "../../../../API/busses/queries";
import useAxiosErrorSnackbar from "../../../../hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "../../../../hooks/useSuccessSnackbar";
import useShrink from "../../../../hooks/useShrink";
import DropDownInput from "../../../login/components/DropDownInput";
import DatePickerComp from "../../components/DatePickerComp";
import TourCities from "./TourCities";
import SaveButton from "../../../../components/buttons/SaveButton";
import useActionSearchParams from "../../../../hooks/useActionSearchParams";
import TextFieldControlled from "@/components/inputs/TextFieldControlled";

type Props = {
  defaultValues?: AddTourBody;
};
const AddForm = ({ defaultValues }: Props) => {
  const { clearActionParams, isEdit, id } = useActionSearchParams();

  const handleClose = () => {
    clearActionParams();
  };

  const form = useForm<AddTourBody>({
    resolver: yupResolver<AddTourBody>(addTourSchema),
    defaultValues: defaultValues ? defaultValues : addTour,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = form;

  const queryClient = useQueryClient();

  const branchesSelect = bussesQuery.useSelectBranchQuery();
  const bussesSelect = toursQueries.useSelectBussesQuery(watch("branchId"));
  const bussesOptions =
    getValues("branchId").length === 0
      ? [{ name: "يجب تحديد الفرع أولاً", id: "" }]
      : bussesSelect.data;

  const mutation = toursQueries.useAddTourMutation();
  const snackBar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const onSubmit = (body: AddTourBody) => {
    mutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.TOUR, "all"]);
        if (isEdit) {
          queryClient.invalidateQueries([controllers.TOUR, "details", id]);
        }
        handleClose();
        successSnackbar("تم حفظ الرحلة بنجاح");
      },
      onError: (err: unknown) => {
        snackBar(err);
      },
    });
  };
  return (
    <form
      encType="multipart/form-data"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* =================================================
          ================ TOUR DETAILS ====================
          =================================================
      */}
      <Paper
        elevation={2}
        sx={{ width: "90vw", mx: "auto", p: 3, borderRadius: 3, mb: 3 }}
      >
        <Typography
          component="h3"
          variant="h5"
          color="primary.main"
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          <LuggageIcon
            fontSize="medium"
            sx={{ color: "secondary.main", mx: 0.5 }}
          />
          تفاصيل الرحلة
        </Typography>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
          flexWrap="wrap"
        >
          <Box sx={{ my: 1 }}>
            <TextFieldControlled
              control={control}
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="اسم الرحلة"
              type="text"
              name="name"
              InputLabelProps={useShrink()}
            />
          </Box>
          <Box sx={{ my: 1, mr: "0px !important", width: "fit-content" }}>
            <Controller
              name="branchId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDownInput
                  error={!!errors.branchId}
                  data={branchesSelect.data}
                  label="الفرع"
                  onChange={(val: string) => {
                    onChange(val);
                    setValue("busId", "");
                  }}
                  value={value}
                  isCity={false}
                  width="18rem"
                />
              )}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.branchId?.message}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
          flexWrap="wrap"
        >
          <Box sx={{ my: 1, mr: "0px !important", width: "fit-content" }}>
            <Controller
              name="leaveDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePickerComp
                  label="تاريخ الانطلاق"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.leaveDate?.message}
            </Typography>
          </Box>
          <Box sx={{ my: 1, mr: "0px !important", width: "fit-content" }}>
            <Controller
              name="arriveDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePickerComp
                  label="تاريخ الوصول"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.arriveDate?.message}
            </Typography>
          </Box>
        </Stack>
      </Paper>
      {/* =================================================
              ================ TOUR CITIES ====================
              =================================================
          */}
      <Box sx={{ my: 1, mx: "auto", width: "fit-content" }}>
        <Controller
          name="tourCities"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TourCities
              onChange={(val: TourCitiesObj[]) => {
                onChange(val);
              }}
              value={value}
            />
          )}
        />
        <Typography className="error-style" component="p" variant="body2">
          {errors.tourCities?.message}
        </Typography>
      </Box>

      {/* =================================================
              ================ BUS DETAILS ====================
              =================================================
          */}

      <Paper
        elevation={2}
        sx={{ width: "90vw", mx: "auto", p: 3, borderRadius: 3, mb: 3 }}
      >
        <Typography
          component="h3"
          variant="h5"
          color="primary.main"
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          <DirectionsBusIcon
            fontSize="medium"
            sx={{ color: "secondary.main", mx: 0.5 }}
          />
          تفاصيل الحافلة
        </Typography>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
          flexWrap="wrap"
        >
          <Box sx={{ my: 1, mr: "0px !important", width: "fit-content" }}>
            <Controller
              name="busId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDownInput
                  error={!!errors.busId}
                  data={bussesOptions}
                  label="الحافلة"
                  onChange={(val: any) => {
                    onChange(val);
                  }}
                  value={value}
                  isCity={true}
                  width="18rem"
                />
              )}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextFieldControlled
              control={control}
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="سعر المقعد"
              type="text"
              name="chairPrice"
              InputLabelProps={useShrink()}
            />
          </Box>
        </Stack>

        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
          flexWrap="wrap"
        >
          <Box sx={{ my: 1 }}>
            <TextFieldControlled
              control={control}
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="اسم السائق"
              type="text"
              name="driverName"
              InputLabelProps={useShrink()}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextFieldControlled
              control={control}
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="معاون السائق"
              type="text"
              name="coDriverName"
              InputLabelProps={useShrink()}
            />
          </Box>
        </Stack>

        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
          flexWrap="wrap"
        >
          <Box sx={{ my: 1 }}>
            <TextFieldControlled
              control={control}
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="رقم موبايل السائق"
              type="text"
              name="driverphoneNumber"
              InputLabelProps={useShrink()}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextFieldControlled
              control={control}
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="رقم موبايل معاون السائق"
              type="text"
              name="coDriverPhoneNumber"
              InputLabelProps={useShrink()}
            />
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
          flexWrap="wrap"
        >
          <Box sx={{ my: 1 }}>
            <TextFieldControlled
              control={control}
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="رقم موبايل بديل للسائق"
              type="text"
              name="anotherDriverphoneNumber"
              InputLabelProps={useShrink()}
            />
          </Box>
          <Box sx={{ my: 1 }}>
            <TextFieldControlled
              control={control}
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="رقم موبايل بديل لمعاون السائق"
              type="text"
              name="anotherCoDriverPhoneNumber"
              InputLabelProps={useShrink()}
            />
          </Box>
        </Stack>
      </Paper>
      <DialogActions>
        <Button onClick={handleClose}>إلغاء</Button>
        <SaveButton isLoading={mutation.isLoading} />
      </DialogActions>
    </form>
  );
};

export default AddForm;
