import React from "react";
import { Dialog, DialogContent, DialogTitle, Fade, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import DeleteForm from "./DeleteForm";
import AddForm from "./AddForm";
import CloseButton from "./CloseButton";
import useActionSearchParams from "../../../hooks/useActionSearchParams";
import TourDetails from "./TourDetails";
import { EditTour } from "./EditTour";
import { useRoleContext } from "@/contexts/RoleContext";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TourActions = () => {
  const {
    id,
    isActive,
    isRemove,
    isAdd,
    isEdit,
    isDetails,
    clearActionParams,
  } = useActionSearchParams();
  const { isStaff } = useRoleContext();
  if ((isAdd || isEdit || isRemove) && isStaff) return null;

  return (
    <Dialog
      keepMounted
      open={isActive}
      onClose={() => clearActionParams()}
      {...(isRemove || isDetails ? { maxWidth: "sm" } : {})}
      fullWidth
      TransitionComponent={Transition}
      aria-describedby="alert-dialog-slide-description"
      fullScreen={isAdd || isEdit}
    >
      {(isAdd || isEdit) && <CloseButton />}
      <Fade in={isActive} timeout={0}>
        <DialogTitle sx={{ mt: 2 }} color="secondary" variant="h4">
          {isDetails && "تفاصيل رحلة المجردة"}
          {isAdd && "إضافة رحلة المجردة"}
          {isEdit && "تعديل رحلة المجردة"}
          {isRemove && "حذف رحلة المجردة"}
        </DialogTitle>
      </Fade>
      <DialogContent>
        {isAdd && <AddForm />}
        {isEdit && <EditTour id={id} />}
        {isRemove && <DeleteForm />}
        {isDetails && <TourDetails id={id} />}
      </DialogContent>
    </Dialog>
  );
};

export default TourActions;
