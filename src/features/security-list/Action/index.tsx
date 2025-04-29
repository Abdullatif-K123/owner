import { Fade } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "../../../components/forms/DialogTitle";
import useActionSearchParams from "@/hooks/useActionSearchParams";
import AddToListForm from "@/features/security-list/Action/AddToListForm";
import { Dispatch, SetStateAction } from "react";
import { TourCustomer } from "@/API/tour/types";

type Props = {
  setList: Dispatch<SetStateAction<TourCustomer[]>>;
};

const SecurityListAction = ({ setList }: Props) => {
  const { isActive, clearActionParams } = useActionSearchParams();
  const handleClose = () => {
    clearActionParams();
  };
  return (
    <>
      <Dialog open={isActive} onClose={handleClose} maxWidth="sm">
        <Fade in={isActive} timeout={0}>
          <DialogTitle onClose={handleClose} fontSize={30} color="primary">
            إضافة راكب
          </DialogTitle>
        </Fade>
        <DialogContent>
          <AddToListForm setList={setList} onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SecurityListAction;
