import DeneralBoxesForm from "@/features/GeneralBoxes/Modal/Form";
import { Dialog, DialogContent, DialogTitle, Fade } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
};
const GeneralBoxesModal = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={"sm"}>
      <Fade in={open} timeout={0}>
        <DialogTitle fontSize={30} color="primary">
          إضافة
        </DialogTitle>
      </Fade>
      <DialogContent>
        <DeneralBoxesForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default GeneralBoxesModal;
