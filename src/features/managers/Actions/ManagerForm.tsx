import { Controller, useForm } from "react-hook-form";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "../../../hooks/useSuccessSnackbar";
import employeesQuery from "../../../API/managers/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { ManagerDefualts, managerSchema } from "./validation";
import { Stack } from "@mui/system";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import TextFieldControlled from "../../../components/inputs/TextFieldControlled";
import Submit from "../../../components/buttons/Submit";
import Loading from "../../../components/feedback/Loading";
import PasswordInput from "../../../components/inputs/PasswordInput";
import UsernameInput from "../../../components/inputs/UsernameInput";
import BranchAutocomplete from "../../../components/selects/BranchAutocomplete";
import useActionSearchParams from "../../../hooks/useActionSearchParams";
import { BranchSelect } from "../../../API/branches/type";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "../../../constants/controllers";
import { ManagerPayload } from "@/API/managers/types";

type Props = {
  defaultValues?: ManagerPayload;
  defaultBranch?: BranchSelect;
};
const ManagerForm = ({ defaultValues, defaultBranch }: Props) => {
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const { isEdit, clearActionParams } = useActionSearchParams();
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading,
    reset: cancelRequest,
  } = employeesQuery.useAddEmployeeMutation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ManagerPayload>({
    defaultValues: defaultValues ? defaultValues : ManagerDefualts,
    resolver: yupResolver(managerSchema),
  });

  const onSubmit = (data: ManagerPayload) => {
    mutate(data, {
      onSuccess: () => {
        const message = defaultValues
          ? "تم تعديل المدير بنجاح"
          : "تمت إضافة المدير بنجاح";
        successSnackbar(message);
        queryClient.invalidateQueries([controllers.Managers, "all_managers"]);
        queryClient.invalidateQueries([
          controllers.Managers,
          "details_manager",
        ]);
        clearActionParams();
      },
      onError: (err) => {
        errorSnackbar(err);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack mt={4} gap={3} mx="auto">
        <Stack direction="row" gap={3}>
          <Box width="97%">
            <TextFieldControlled
              required
              label="الاسم"
              name="firstName"
              control={control}
            />
          </Box>
          <Box width="103%">
            <TextFieldControlled
              required
              label="الكنية"
              name="lastName"
              control={control}
            />
          </Box>
        </Stack>
        <Stack direction="row" gap={3}>
          <UsernameInput name="username" control={control} required />
          <PasswordInput name="password" control={control} required={!isEdit} />
        </Stack>
        <Stack direction="row" gap={3} alignItems="center">
          <Box sx={{ width: "97%" }}>
            <TextFieldControlled
              required
              control={control}
              name="phoneNumber"
              label="الرقم"
            />
          </Box>
          <Box sx={{ width: "103%" }}>
            <Controller
              name="branchId"
              control={control}
              render={({ field: { onChange } }) => (
                <BranchAutocomplete
                  onChange={(_, value) => {
                    onChange(value?.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      label="الفرع"
                      helperText={errors.branchId?.message}
                      error={!!errors.branchId}
                      {...params}
                    />
                  )}
                  defaultValue={defaultBranch ? defaultBranch : undefined}
                />
              )}
            />
          </Box>
        </Stack>
        <FormControlLabel
          sx={{ mx: 0.8, width: "fit-content" }}
          control={
            <Checkbox
              name="isPrimary"
              onChange={(e) => setValue("isPrimary", e.target.checked)}
              checked={watch("isPrimary")}
            />
          }
          label="أساسي"
        />
        <Stack direction="row" gap={1} justifyContent="center">
          <Submit disabled={isLoading}>
            {isLoading ? (
              <Loading size={15} />
            ) : defaultValues ? (
              "تعديل"
            ) : (
              "إضافة"
            )}
          </Submit>
          <Button
            onClick={() => {
              cancelRequest();
              clearActionParams();
            }}
            variant="outlined"
          >
            إلغاء
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default ManagerForm;
