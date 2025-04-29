import {
  Box,
  Button,
  Paper,
  TextField,
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
import { addTour, addTourSchema } from "@/features/tours/validations";
import { toursQueries } from "../../../../API/tour/queries";
import bussesQuery from "../../../../API/busses/queries";
import useAxiosErrorSnackbar from "../../../../hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "../../../../hooks/useSuccessSnackbar";
import useShrink from "../../../../hooks/useShrink";
import DropDownInput from "../../../login/components/DropDownInput";
import TourCities from "@/features/tours/Actions/AddForm/TourCities";
import SaveButton from "../../../../components/buttons/SaveButton";
import useActionSearchParams from "../../../../hooks/useActionSearchParams";
import { virtualQueries } from "@/API/virtualTours/queries";
import TimePickerComp from "../components/timePickerComp";

type Props = {
  defaultValues?: AddTourBody;
};

const AddForm = ({ defaultValues }: Props) => {
  const { clearActionParams } = useActionSearchParams();

  const handleClose = () => {
    clearActionParams();
  };

  const form = useForm<AddTourBody>({
    resolver: yupResolver<AddTourBody>(addTourSchema),
    defaultValues: defaultValues ? defaultValues : addTour,
  });
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    watch,
    setValue,
  } = form;

  const queryClient = useQueryClient();

  const branchesSelect = bussesQuery.useSelectBranchQuery();
  const bussesSelect = toursQueries.useSelectBussesQuery(watch("branchId"));
  const bussesOptions =
    getValues("branchId").length === 0
      ? [{ name: "يجب تحديد الفرع أولاً", id: "" }]
      : bussesSelect.data;

  const mutation = virtualQueries.useAction();
  const { isLoading } = mutation;
  const snackBar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const onSubmit = (body: AddTourBody) => {
    mutation.mutate(body, {
      onSuccess: () => {
        successSnackbar("تم حفظ الرحلة المجردة بنجاح");
        queryClient.invalidateQueries([controllers.VIRTUAL_TOUR, "all"]);
        if (defaultValues) {
          queryClient.invalidateQueries([
            controllers.VIRTUAL_TOUR,
            "details",
            body.id,
          ]);
        }
        handleClose();
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
            <TextField
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="اسم الرحلة"
              type="text"
              {...register("name")}
              InputLabelProps={useShrink()}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.name?.message}
            </Typography>
          </Box>
          <Box sx={{ my: 1, mr: "0px !important", width: "fit-content" }}>
            <Controller
              name="branchId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DropDownInput
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
                <TimePickerComp
                  label="وقت الانطلاق"
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
                <TimePickerComp
                  label="وقت الوصول"
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
            <Typography className="error-style" component="p" variant="body2">
              {errors.busId?.message}
            </Typography>
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="سعر المقعد"
              type="text"
              {...register("chairPrice")}
              InputLabelProps={useShrink()}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.chairPrice?.message}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
          flexWrap="wrap"
        >
          <Box sx={{ my: 1 }}>
            <TextField
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="اسم السائق"
              type="text"
              {...register("driverName")}
              InputLabelProps={useShrink()}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.driverName?.message}
            </Typography>
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="معاون السائق"
              type="text"
              {...register("coDriverName")}
              InputLabelProps={useShrink()}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.coDriverName?.message}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
          flexWrap="wrap"
        >
          <Box sx={{ my: 1 }}>
            <TextField
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="رقم موبايل السائق"
              type="text"
              {...register("driverphoneNumber")}
              InputLabelProps={useShrink()}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.driverphoneNumber?.message}
            </Typography>
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="رقم موبايل معاون السائق"
              type="text"
              {...register("coDriverPhoneNumber")}
              InputLabelProps={useShrink()}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.coDriverPhoneNumber?.message}
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-evenly" }}
          flexWrap="wrap"
        >
          <Box sx={{ my: 1 }}>
            <TextField
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="رقم موبايل بديل للسائق"
              type="text"
              {...register("anotherDriverphoneNumber")}
              InputLabelProps={useShrink()}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.anotherDriverphoneNumber?.message}
            </Typography>
          </Box>
          <Box sx={{ my: 1 }}>
            <TextField
              sx={{ width: { xs: "14rem", sm: "18rem" } }}
              label="رقم موبايل بديل لمعاون السائق"
              type="text"
              {...register("anotherCoDriverPhoneNumber")}
              InputLabelProps={useShrink()}
            />
            <Typography className="error-style" component="p" variant="body2">
              {errors.anotherCoDriverPhoneNumber?.message}
            </Typography>
          </Box>
        </Stack>
      </Paper>
      <DialogActions>
        <Button onClick={handleClose}>إلغاء</Button>
        <SaveButton isLoading={isLoading} />
      </DialogActions>
    </form>
  );
};

export default AddForm;
