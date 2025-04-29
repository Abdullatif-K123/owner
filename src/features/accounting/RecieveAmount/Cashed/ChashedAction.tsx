import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { AccountingRecieveActionBody } from "@/API/accounting/types";
import ControlledStaffSelect from "@/components/selects/ControlledStaffSelect";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import { useQueryClient } from "@tanstack/react-query";
import { accountingQueries } from "@/API/accounting/queries";
import ButtonsStack from "@/components/layout/ButtonsStack";
import Submit from "@/components/buttons/Submit";
import Loading from "@/components/feedback/Loading";
import controllers from "@/constants/controllers";

const ChashedAction = ({
  onClose,
  disabled,
}: {
  onClose: () => void;
  disabled?: boolean;
}) => {
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading,
    reset: cancelRequest,
  } = accountingQueries.cashedAction();

  const { control, handleSubmit } = useForm<AccountingRecieveActionBody>({
    resolver: yupResolver<{ recievedOwnerStaffId: string }>(
      yup.object({
        recievedOwnerStaffId: yup.string().required("يجب تحديد الموظف"),
      })
    ),
    defaultValues: { recievedOwnerStaffId: "" },
  });

  const onSubmit = (data: AccountingRecieveActionBody) => {
    mutate(data, {
      onSuccess: () => {
        successSnackbar("تم التسليم بنجاح");
        queryClient.invalidateQueries([controllers.ACCOUNTING, "cashed"]);
        queryClient.invalidateQueries([controllers.ACCOUNTING, "analytics"]);
        queryClient.invalidateQueries([controllers.ACCOUNTING, "all"]);
        onClose();
      },
      onError: (err) => {
        errorSnackbar(err);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack
        gap={3}
        sx={{
          opacity: disabled ? 0.5 : 1,
          pointerEvents: disabled ? "none" : "all",
        }}
      >
        <ControlledStaffSelect
          label="الموظف"
          control={control}
          name="recievedOwnerStaffId"
        />
        <ButtonsStack>
          <Submit disabled={isLoading}>
            {isLoading ? <Loading size={15} /> : "تسليم"}
          </Submit>
          <Button
            onClick={() => {
              cancelRequest();
              onClose();
            }}
            variant="outlined"
          >
            إلغاء
          </Button>
        </ButtonsStack>
      </Stack>
    </form>
  );
};

export default ChashedAction;
