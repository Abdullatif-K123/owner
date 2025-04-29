import { companyAccountingQueries } from "@/API/company-accounting/queries";
import LoadingButton from "@/components/buttons/LoadingButton";
import ButtonsStack from "@/components/layout/ButtonsStack";
import controllers from "@/constants/controllers";
import { useCompanyAccountingContext } from "@/features/company-accounting/context/CompanyAccountingContext";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

const ConfirmDialog = () => {
  const queryClient = useQueryClient();

  const {
    tours,
    clearTours,
    setModalOpened,
    modalOpened,
    setIsSelectionEnabeld,
  } = useCompanyAccountingContext();
  const { mutate, isLoading } = companyAccountingQueries.action();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const onClose = () => {
    clearTours();
    setModalOpened(false);
    setIsSelectionEnabeld(false);
  };

  const handleConfirm = () => {
    mutate(tours, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.ACCOUNTING, "company-all"]);
        successSnackbar("تم تأكيد الاستلام بنجاح");
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
    <Dialog open={modalOpened} onClose={onClose} fullWidth maxWidth={"sm"}>
      <Fade in={modalOpened} timeout={0}>
        <DialogTitle fontSize={30} color="primary">
          تأكيد الاستلام
        </DialogTitle>
      </Fade>
      <DialogContent>
        <Typography>هل أنت متأكد من الاستلام؟</Typography>
        <ButtonsStack sx={{ mt: "20px" }}>
          <LoadingButton
            isLoading={isLoading}
            variant="contained"
            label="تأكيد"
            onClick={handleConfirm}
          />
          <Button variant="outlined" onClick={() => onClose()}>
            إلغاء
          </Button>
        </ButtonsStack>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
