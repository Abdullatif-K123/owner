 
import { useForm, Controller } from "react-hook-form";
import { toursQueries } from "@/API/tour/queries";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import { Button, Stack, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import { EditBusNumberPayload } from "@/API/tour/types"; // Create this type accordingly
import useActionSearchParams from "@/hooks/useActionSearchParams";
import controllers from "@/constants/controllers";
const busNumberSchema = yup.object().shape({
    tourId: yup.string().required(),
  busName: yup.string().required("الحقل مطلوب"),
});

type Props = {
  defaultValues?: EditBusNumberPayload;
};

 
const EditBusNumberForm = ({ defaultValues }: Props) => {
    const { clearActionParams } = useActionSearchParams();
    const handleClose = () => {
        clearActionParams();
      };
  const form = useForm<EditBusNumberPayload>({
    resolver: yupResolver(busNumberSchema),
    defaultValues: defaultValues || { tourId: "", busName: "" },
  });

  const { control, handleSubmit, formState: { errors } } = form;

 
 
  const queryClient = useQueryClient();
  
  const mutation = toursQueries.useBusNameMutation();
  const snackBar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const onSubmit = (data: EditBusNumberPayload) => {
  
    mutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries([controllers.TOUR, "all"]);
          queryClient.invalidateQueries([
            controllers.TOUR,
            "details",
            defaultValues?.tourId,
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
    <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: "20px"}} >
      <Stack spacing={2}>
        <Controller
          name="busName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="اسم الحافلة"
              error={!!errors.busName}
              helperText={errors.busName?.message}
            />
          )}
        />
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="error" onClick={()=>{handleClose()}} >
            إلغاء
          </Button>
          <Button type="submit" variant="contained">تعديل</Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default EditBusNumberForm;
