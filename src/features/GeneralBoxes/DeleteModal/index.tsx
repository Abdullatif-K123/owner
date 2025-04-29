import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Typography,
} from "@mui/material";
import ButtonsStack from "@/components/layout/ButtonsStack";
import LoadingButton from "@/components/buttons/LoadingButton";
import { accountingQueries } from "@/API/accounting/queries";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "@/constants/controllers";
import { useSearchParams } from "react-router-dom";
import { moneyFormatter } from "@/utils/transforms";

const GeneralBoxesDeleteModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const amount = searchParams.get("amount") ?? 0;
  const id = searchParams.get("id") ?? "";

  const queryClient = useQueryClient();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const { mutate, isLoading } = accountingQueries.removeSandookTour();
  const onDelete = () => {
    mutate(id, {
      onSuccess: () => {
        successSnackbar("تم الحذف بنجاح");
        queryClient.invalidateQueries([
          controllers.ACCOUNTING,
          "general-boxes",
        ]);
        onClose();
      },
      onError: (e) => {
        errorSnackbar(e);
      },
    });
  };

  const onClose = () => {
    searchParams.delete("amount");
    searchParams.delete("id");
    setSearchParams(searchParams, { replace: true });
  };
  return (
    <Dialog open={!!id} onClose={onClose} fullWidth maxWidth={"sm"}>
      <Fade in={!!id} timeout={0}>
        <DialogTitle fontSize={30} color="primary">
          حذف
        </DialogTitle>
      </Fade>
      <DialogContent>
        <Typography variant="subtitle1" mb={2}>
          هل أنت متأكد من حذف المصروف؟
        </Typography>
        <Typography
          px={3}
          py={1}
          width="fit-content"
          marginInline="auto"
          border={"1px solid"}
          borderColor="error.main"
          borderRadius="20px"
          variant="subtitle1"
          mb={3}
        >
          {moneyFormatter.format(+amount)}
        </Typography>
        <ButtonsStack>
          <LoadingButton
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => onDelete()}
            variant="contained"
            color="error"
            label="حذف"
          />
          <Button disabled={isLoading} onClick={onClose} variant="outlined">
            إلغاء
          </Button>
        </ButtonsStack>
      </DialogContent>
    </Dialog>
  );
};

export default GeneralBoxesDeleteModal;
