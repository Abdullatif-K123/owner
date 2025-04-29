import { Fade } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "../../../components/forms/DialogTitle";
import ReservationForm from "@/features/reservations/Action/ReservationForm";
import { useReservationsContext } from "../context/ReservationsContext";
import { useRoleContext } from "@/contexts/RoleContext";
import Details from "@/features/reservations/Action/Details";
import AddForm from "@/features/reservations/Action/ReservationForm/AddForm";

const Action = () => {
  const {
    tourId,
    setToEdit,
    toEdit: customerData,
    isActionOpened,
    setIsActionOpened,
  } = useReservationsContext();
  const { isOwner } = useRoleContext();

  const isEdit = !!customerData;
  const handleClose = () => {
    setIsActionOpened(false);
    setToEdit(null);
  };
  return (
    <>
      <Dialog
        open={isActionOpened}
        onClose={handleClose}
        fullWidth
        maxWidth={isOwner ? "sm" : "md"}
      >
        <Fade in={isActionOpened} timeout={0}>
          <DialogTitle onClose={handleClose} fontSize={30} color="primary">
            {isEdit && !isOwner && "تعديل"}
            {!isEdit && !isOwner && "إضافة"}
            {isOwner && "تفاصيل الحجز"}
          </DialogTitle>
        </Fade>
        <DialogContent>
          {!isOwner &&
            (isEdit ? (
              <ReservationForm
                tourId={tourId}
                onClose={handleClose}
                data={customerData}
              />
            ) : (
              <AddForm tourId={tourId} onClose={handleClose} />
            ))}
          {isOwner && <Details data={customerData} />}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Action;
