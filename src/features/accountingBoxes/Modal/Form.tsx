import { useParams } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { accountingQueries } from "@/API/accounting/queries";
import { AccountingBody } from "@/API/accounting/types";
import Submit from "@/components/buttons/Submit";
import Loading from "@/components/feedback/Loading";
import DatePickerComp from "@/components/inputs/DatePickerComp";
import TextFieldControlled from "@/components/inputs/TextFieldControlled";
import ButtonsStack from "@/components/layout/ButtonsStack";
import controllers from "@/constants/controllers";
import {
  accountignDefualts,
  accountignSchema,
} from "@/features/accounting/Modal/validation";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";

const AccountingActionForm = ({ onClose }: { onClose: () => void }) => {
  const { id } = useParams();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();
  const queryClient = useQueryClient();
  const {
    mutate,
    isLoading,
    reset: cancelRequest,
  } = accountingQueries.action();

  const { control, handleSubmit } = useForm<AccountingBody>({
    defaultValues: accountignDefualts,
    resolver: yupResolver(accountignSchema),
  });

  const onSubmit = (data: AccountingBody) => {
    data = { ...data, tourId: id };
    mutate(data, {
      onSuccess: () => {
        successSnackbar("تمت الإضافة بنجاح");
        queryClient.invalidateQueries([controllers.ACCOUNTING, "boxes", id]);
      },
      onError: (err) => {
        errorSnackbar(err);
      },
      onSettled: () => {
        onClose();
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack mt={4} gap={3} mx="auto">
        <TextFieldControlled
          required
          label="الاسم"
          name="name"
          control={control}
        />
        <TextFieldControlled
          required
          label="الكمية"
          name="amount"
          control={control}
        />
        <Controller
          name="date"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePickerComp label="التاريخ" onChange={onChange} value={value} />
          )}
        />
        <TextFieldControlled
          label="الوصف"
          multiline
          rows={3}
          name="description"
          control={control}
        />

        <ButtonsStack>
          <Submit disabled={isLoading}>
            {isLoading ? <Loading size={15} /> : "إضافة"}
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

export default AccountingActionForm;
