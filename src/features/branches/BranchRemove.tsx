import { FC, useState } from "react";
import RemoveDialog from "../../components/forms/RemoveDialog";
import { useSearchParams } from "react-router-dom";
import branchQueries from "../../API/branches/queries";
import { useQueryClient } from "@tanstack/react-query";
import controllers from "../../constants/controllers";
import useAxiosErrorSnackbar from "../../hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "../../hooks/useSuccessSnackbar";

type Props = {
  deleteOpen: boolean;
  setDeleteOpen: any;
};

const BranchRemove: FC<Props> = ({ deleteOpen, setDeleteOpen }) => {
  const [isLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("DelId") ?? "";

  const deleteMutation = branchQueries.useRemoveMutation();
  const queryClient = useQueryClient();

  const handleClose = () => {
    setDeleteOpen(false);
    setSearchParams({});
  };

  const errSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const handleRemove = () => {
    deleteMutation.mutate(id, {
      onSuccess: (_data) => {
        queryClient.invalidateQueries([controllers.BRANCH, "all"]);
        handleClose();
        successSnackbar("تم إزالة الفرع بنجاح");
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
        حذف فرع
      </RemoveDialog>
    </>
  );
};

export default BranchRemove;
