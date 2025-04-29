import React from "react";
import { Dialog, DialogContent, DialogTitle, Fade, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import DeleteForm from "./DeleteForm";
import AddForm from "./AddForm";
import CloseButton from "./CloseButton";
import useActionSearchParams from "../../../hooks/useActionSearchParams";
import TourDetails from "./TourDetails";
import { EditTour } from "@/features/tours/Actions/EditTour";
import VirtualTour from "@/features/tours/Actions/VirtualTour";
import { EditTourTime } from "@/features/tours/Actions/EditTimeForm";
import { EditBusForm } from "@/features/tours/Actions/EditBusForm";
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
    isVirtual,
    isDetails,
    isCustom,
    isCustomBus,
    clearActionParams,
  } = useActionSearchParams({ customKey: "editTime" });
   
  return (
    <Dialog
      keepMounted
      open={isActive || isVirtual}
      onClose={() => clearActionParams()}
      {...(isRemove || isDetails ? { maxWidth: "sm" } : {})}
      fullWidth
      TransitionComponent={Transition}
      aria-describedby="alert-dialog-slide-description"
      fullScreen={isAdd || isEdit || isVirtual}
    >
      {(isAdd || isEdit || isVirtual) && <CloseButton />}
      <Fade in={isActive || isVirtual} timeout={0}>
        <DialogTitle sx={{ mt: 2 }} color="secondary" variant="h4">
          {isDetails && "تفاصيل رحلة"}
          {(isVirtual || isAdd) && "إضافة رحلة"}
          {isEdit && "تعديل رحلة"}
          {isRemove && "حذف رحلة"}
          {isCustom && "تعديل وقت الرحلة"}
          {isCustomBus && "تعديل اسم الحافلة"}
        </DialogTitle>
      </Fade>
      <DialogContent>
        {isAdd && <AddForm />}
        {isEdit && <EditTour id={id} />}
        {isVirtual && <VirtualTour id={id} />}
        {isRemove && <DeleteForm />}
        {isDetails && <TourDetails id={id} />}
        {isCustomBus && <EditBusForm tourId={id} />}
        {isCustom && <EditTourTime id={id} />}
      </DialogContent>
    </Dialog>
  );
};

export default TourActions;
