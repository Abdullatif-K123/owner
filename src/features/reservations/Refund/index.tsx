import { Dialog, DialogContent, Fade } from "@mui/material";
import DialogTitle from "../../../components/forms/DialogTitle";
import { useReservationsContext } from "../context/ReservationsContext";
import RefundForm from "./RefundForm";

const RefundModal = () => {
  const { tourId, toCancelChair, isRefundOpened, setIsRefundOpened, toCancel } =
    useReservationsContext();

  const handleClose = () => {
    setIsRefundOpened(false);
  };
  return (
    <Dialog
      open={isRefundOpened}
      onClose={handleClose}
      fullWidth
      maxWidth={"md"}
    >
      <Fade in={isRefundOpened} timeout={0}>
        <DialogTitle onClose={handleClose} fontSize={30} color="primary">
          استرجاع المبلغ
        </DialogTitle>
      </Fade>
      <DialogContent>
        <RefundForm
          tourId={tourId}
          chairId={toCancelChair}
          amount={toCancel?.amount}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RefundModal;
