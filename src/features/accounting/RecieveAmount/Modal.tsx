import { ModalType } from "@/features/accounting/RecieveAmount";
import Cahsed from "@/features/accounting/RecieveAmount/Cashed";
import Recieved from "@/features/accounting/RecieveAmount/Recieved";
import { Dialog, DialogContent, DialogTitle, Fade } from "@mui/material";

type Props = {
  type: ModalType;
  onClose: () => void;
};
const RecieveAmountModal = ({ type, onClose }: Props) => {
  const open = type !== ModalType.Closed;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"sm"}>
      <Fade in={open} timeout={0}>
        <DialogTitle fontSize={30} color="primary">
          تسليم مبلغ الرحلات {type === ModalType.Cash ? "القادمة" : "المنتهية"}
        </DialogTitle>
      </Fade>
      <DialogContent>
        {type === ModalType.Cash && <Cahsed onClose={onClose} />}
        {type === ModalType.Recieved && <Recieved onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
};

export default RecieveAmountModal;
