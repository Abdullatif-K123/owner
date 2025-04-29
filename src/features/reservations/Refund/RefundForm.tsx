import { useEffect } from "react";
import { refundFormDefault, refundFormSchema } from "./validation";
import { RefundFormTypes } from "./type";
import { toursQueries } from "@/API/tour/queries";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Grid, Typography } from "@mui/material";
import TextFieldControlled from "@/components/inputs/TextFieldControlled";
import Submit from "@/components/buttons/Submit";
import { moneyFormatter } from "@/utils/transforms";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "@/constants/controllers";
import { useReservationsContext } from "@/features/reservations/context/ReservationsContext";

type Props = {
  tourId: string;
  chairId: string[];
  amount: number | undefined;
};

const RefundForm = ({ tourId, chairId, amount }: Props) => {
  const defaultValues = refundFormDefault;
  const { control, setValue, handleSubmit, watch } = useForm<RefundFormTypes>({
    resolver: yupResolver(refundFormSchema),
    defaultValues,
  });
  const { setIsRefundOpened, clearToCancelList } = useReservationsContext();

  const action = toursQueries.useRefund();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  useEffect(() => {
    setValue("tourId", tourId);
    setValue("tourCustomerChairId", chairId[0]);
  }, []);

  // validations
  useEffect(() => {}, [watch("amount")]);
  const queryClient = useQueryClient();
  const onSubmit = (body: RefundFormTypes) => {
    action.mutate(body, {
      onSuccess: () => {
        successSnackbar("تم استرجاع الرحلة بنجاح");
        queryClient.invalidateQueries([controllers.TOUR, "reservations"]);
        clearToCancelList();
        setIsRefundOpened(false);
      },
      onError: (err: unknown) => {
        errorSnackbar(err);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid
        container
        alignItems={"start"}
        justifyContent={"space-around"}
        spacing={1}
      >
        <Grid container item xs={12} md={7} spacing={2} my={1}>
          <Grid item xs={12}>
            <Typography color="secondary" variant="h6">
              المبلغ الكلي:
              <Typography component="span" color="black" sx={{ mx: 1 }}>
                {moneyFormatter.format(amount || 0)}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextFieldControlled
              control={control}
              name="amount"
              label="المبلغ"
              type="number"
              inputProps={{ step: "500", min: "0", max: amount }}
              required
            />
          </Grid>
          <Grid
            justifySelf={"end"}
            item
            xs={12}
            justifyContent="center"
            display="flex"
          >
            <Submit size="large" isSubmitting={action.isLoading}>
              حفظ
            </Submit>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default RefundForm;
