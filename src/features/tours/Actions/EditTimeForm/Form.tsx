import { toursQueries } from "@/API/tour/queries";
import { EditTourTimePayload } from "@/API/tour/types";
import Submit from "@/components/buttons/Submit";
import ButtonsStack from "@/components/layout/ButtonsStack";
import controllers from "@/constants/controllers";
import {
  editTourTimeDefaultValues,
  editTourTimeSchema,
} from "@/features/tours/Actions/EditTimeForm/validation";
import DateTimePickerComp from "@/features/tours/components/DatePickerComp";
import useActionSearchParams from "@/hooks/useActionSearchParams";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

type Props = {
  defaultValues?: EditTourTimePayload;
};

const EditTimeForm = ({ defaultValues }: Props) => {
  const { clearActionParams } = useActionSearchParams();

  const handleClose = () => {
    clearActionParams();
  };

  const form = useForm<EditTourTimePayload>({
    resolver: yupResolver<EditTourTimePayload>(editTourTimeSchema),
    defaultValues: defaultValues ? defaultValues : editTourTimeDefaultValues,
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const queryClient = useQueryClient();

  const mutation = toursQueries.useEditTourTimeMutation();
  const snackBar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const onSubmit = (body: EditTourTimePayload) => {
    mutation.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.TOUR, "all"]);
        queryClient.invalidateQueries([
          controllers.TOUR,
          "details",
          defaultValues?.id,
        ]);
        handleClose();
        successSnackbar("تم حفظ الرحلة بنجاح");
      },
      onError: (err: unknown) => {
        snackBar(err);
      },
    });
  };
  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Stack
        justifyContent="center"
        sx={{ justifyContent: "space-evenly" }}
        flexWrap="wrap"
      >
        <Box sx={{ my: 1, mx: "auto", width: "fit-content" }}>
          <Controller
            name="leaveDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateTimePickerComp
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
        <Box sx={{ my: 1, mx: "auto", width: "fit-content" }}>
          <Controller
            name="arriveDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateTimePickerComp
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
        <ButtonsStack sx={{ mt: 2 }}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            إلغاء
          </Button>
          <Submit isSubmitting={mutation.isLoading}>تعديل</Submit>
        </ButtonsStack>
      </Stack>
    </form>
  );
};

export default EditTimeForm;
