import { useQueryClient } from "@tanstack/react-query";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "../../../hooks/useSuccessSnackbar";
import controllers from "../../../constants/controllers";
import useActionSearchParams from "../../../hooks/useActionSearchParams";
import DeleteModal from "../../../components/modal/DeleteModal";
import managersQuery from "../../../API/managers/queries";

const DeleteForm = () => {
  const { id, clearActionParams } = useActionSearchParams({ idKey: "DelId" });

  const deleteMutation = managersQuery.useRemoveMutation();
  const queryClient = useQueryClient();

  const { isLoading } = deleteMutation;

  const errSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const handleRemove = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.Managers, "all_managers"]);
        successSnackbar("تم إزالة المدير بنجاح");
        clearActionParams();
      },
      onError: (err) => errSnackbar(err),
    });
  };
  const onCencel = () => {
    clearActionParams();
    deleteMutation.reset();
  };
  return (
    <>
      <DeleteModal
        isLoading={isLoading}
        name="المدير"
        onDelete={handleRemove}
        onCancel={onCencel}
      />
    </>
  );
};

export default DeleteForm;
