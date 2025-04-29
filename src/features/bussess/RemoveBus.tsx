import RemoveDialog from "../../components/forms/RemoveDialog";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import bussesQuery from "../../API/busses/queries";
import controllers from "../../constants/controllers";
import useAxiosErrorSnackbar from "../../hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "../../hooks/useSuccessSnackbar";

type Props = {
  deleteOpen: boolean;
  setDeleteOpen: any;
};

const RemoveBus = ({ deleteOpen, setDeleteOpen }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("DelId") ?? "";

  const deleteMutation = bussesQuery.useRemoveMutation();
  const queryClient = useQueryClient();

  const { isLoading } = deleteMutation;

  const handleClose = () => {
    setDeleteOpen(false);
    setSearchParams({});
  };

  const errSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const handleRemove = () => {
    deleteMutation.mutate(id, {
      onSuccess: (_data) => {
        queryClient.invalidateQueries([controllers.BUS, "all"]);
        setDeleteOpen(false);
        setSearchParams({});
        successSnackbar("تم إزالة الحافلة بنجاح");
      },
      onError: (err) => errSnackbar(err),
    });
  };

  return (
    <>
      <RemoveDialog
        open={deleteOpen}
        isLoading={isLoading}
        handleCancel={handleClose}
        handleRemove={handleRemove}
      >
        حذف الحافلة
      </RemoveDialog>
    </>
  );
};

export default RemoveBus;
