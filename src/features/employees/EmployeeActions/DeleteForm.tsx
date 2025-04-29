import { useQueryClient } from "@tanstack/react-query";
import employeesQuery from "../../../API/employees/queries";
import useAxiosErrorSnackbar from "../../../hooks/useAxiosErrorSnackBar";
import useSuccessSnackbar from "../../../hooks/useSuccessSnackbar";
import controllers from "../../../constants/controllers";
import useActionSearchParams from "../../../hooks/useActionSearchParams";
import DeleteModal from "../../../components/modal/DeleteModal";

const DeleteForm = () => {
  const { id, clearActionParams } = useActionSearchParams({ idKey: "DelId" });

  const deleteMutation = employeesQuery.useRemoveMutation();
  const queryClient = useQueryClient();

  const { isLoading } = deleteMutation;

  const errSnackbar = useAxiosErrorSnackbar();
  const successSnackbar = useSuccessSnackbar();

  const handleRemove = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries([controllers.OwnerStaff, "all"]);
        successSnackbar("تم إزالة الموظف بنجاح");
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
        name="الموظف"
        onDelete={handleRemove}
        onCancel={onCencel}
      />
    </>
  );
};

export default DeleteForm;
