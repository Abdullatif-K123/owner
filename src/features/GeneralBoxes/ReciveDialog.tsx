import { accountingQueries } from "@/API/accounting/queries";
import { GeneralBoxesRecieveBody } from "@/API/accounting/types";
import LoadingButton from "@/components/buttons/LoadingButton";
import ButtonsStack from "@/components/layout/ButtonsStack";
import ControlledStaffSelect from "@/components/selects/ControlledStaffSelect";
import controllers from "@/constants/controllers";
import { useGeneralBoxesContext } from "@/features/GeneralBoxes/context/GeneralBoxesContext";
import useAxiosErrorSnackbar from "@/hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "@/hooks/useSuccessSnackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  Typography,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ReciveDialog = ({ isReceived }: { isReceived?: boolean }) => {
  const queryClient = useQueryClient();
  const {
    boxes,
    clearBoxes,
    setModalOpened,
    modalOpened,
    setIsSelectionEnabeld,
  } = useGeneralBoxesContext();
  const { mutate, isLoading } = accountingQueries.generalBoxesRecieve();
  const { mutate: finishedMutate, isLoading: isLoadingFinished } =
    accountingQueries.ownerFinishedAction();
  const { mutate: recievedMutate, isLoading: isLoadingRecieved } =
    accountingQueries.ownerRecievedAction();
  const errorSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const onClose = () => {
    clearBoxes();
    setModalOpened(false);
    setIsSelectionEnabeld(false);
  };

  const { control, handleSubmit } = useForm<GeneralBoxesRecieveBody>({
    resolver: yupResolver<{ ownerStaffId: string }>(
      yup.object({
        ownerStaffId: yup.string().required("يجب تحديد الموظف"),
      })
    ),
    defaultValues: { ownerStaffId: "" },
  });

  const onSuccess = (msg: string = "تم تأكيد التسليم بنجاح") => {
    queryClient.invalidateQueries([controllers.ACCOUNTING, "general-boxes"]);
    successSnackbar(msg);
  };
  const onError = (err: unknown) => errorSnackbar(err);
  const onSettled = () => onClose();
  const onSubmit = (body: GeneralBoxesRecieveBody) => {
    mutate(
      { ids: boxes, ownerStaffId: body.ownerStaffId },
      {
        onSuccess: () => onSuccess(),
        onError,
        onSettled,
      }
    );
  };

  const onOwnerAction = () => {
    if (isReceived === true) {
      recievedMutate(boxes, {
        onSuccess: () => onSuccess("تم التسليم بنجاح"),
        onError,
        onSettled,
      });
    } else if (isReceived === false) {
      finishedMutate(boxes, {
        onSuccess: () => onSuccess("تم إنهاء المصاريف بنجاح"),
        onError,
        onSettled,
      });
    }
  };
  return (
    <Dialog open={modalOpened} onClose={onClose} fullWidth maxWidth={"sm"}>
      <Fade in={modalOpened} timeout={0}>
        <DialogTitle fontSize={30} color="primary">
          {isReceived === true && "تأكيد الاستلام"}
          {isReceived === false && "تأكيد إنهاء المصاريف"}
          {isReceived === undefined && "تأكيد التسليم"}
        </DialogTitle>
      </Fade>
      <DialogContent>
        <div>
          <Typography mb={3}>
            هل أنت متأكد من {isReceived === true && "الاستلام"}
            {isReceived === false && "إنهاء المصاريف"}
            {isReceived === undefined && "التسليم"}
          </Typography>
          {isReceived === undefined && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <ControlledStaffSelect
                label="الموظف"
                control={control}
                name="ownerStaffId"
              />
              <ButtonsStack sx={{ mt: "20px" }}>
                <LoadingButton
                  type="submit"
                  isLoading={isLoading}
                  variant="contained"
                  label="تأكيد"
                />
                <Button variant="outlined" onClick={() => onClose()}>
                  إلغاء
                </Button>
              </ButtonsStack>
            </form>
          )}
          {isReceived !== undefined && (
            <ButtonsStack sx={{ mt: "20px" }}>
              <LoadingButton
                type="submit"
                isLoading={isLoadingFinished || isLoadingRecieved}
                variant="contained"
                label="تأكيد"
                onClick={() => onOwnerAction()}
              />
              <Button variant="outlined" onClick={() => onClose()}>
                إلغاء
              </Button>
            </ButtonsStack>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReciveDialog;
