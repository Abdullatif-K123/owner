import { accountingQueries } from "@/API/accounting/queries";
import LoadingButton from "@/components/buttons/LoadingButton";
import ButtonsStack from "@/components/layout/ButtonsStack";
import controllers from "@/constants/controllers";
import { useAccountingContext } from "@/features/accounting/context/AccountingContext";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

const RecieveToursButton = () => {
  const { tours, setIsSelectionEnabeld, clearTours, isSelectionEnabeld } =
    useAccountingContext();

  const successSnackbar = useSuccessSnackbar();
  const errorSnackbar = useAxiosErrorSnackbar();

  const { mutate, isLoading } = accountingQueries.recieveTorusAction();

  const queryClient = useQueryClient();

  const onRecieve = () => {
    mutate(tours, {
      onSuccess: () => {
        setIsSelectionEnabeld(false);
        queryClient.invalidateQueries([controllers.ACCOUNTING, "all"]);
        queryClient.invalidateQueries([controllers.ACCOUNTING, "analytics"]);
        successSnackbar("تم الاستلام بنجاح");
        clearTours();
      },
      onError: (err) => {
        errorSnackbar(err);
      },
    });
  };

  const onCancel = () => {
    setIsSelectionEnabeld(false);
  };

  if (!isSelectionEnabeld)
    return (
      <Button variant="contained" onClick={() => setIsSelectionEnabeld(true)}>
        استلام رحلات
      </Button>
    );

  return (
    <ButtonsStack>
      <LoadingButton
        isLoading={isLoading}
        variant="contained"
        onClick={onRecieve}
        label="تأكيد الاستلام"
      />
      <Button
        disabled={isLoading}
        variant="outlined"
        color="error"
        onClick={onCancel}
      >
        إلغاء
      </Button>
    </ButtonsStack>
  );
};

export default RecieveToursButton;
