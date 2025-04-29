import { Dialog, DialogContent, DialogTitle, Fade } from "@mui/material";
import UpdateForm from "./UpdateForm";
import EmployeeForm from "./EmployeeForm";
import useActionSearchParams from "../../../hooks/useActionSearchParams";
import DeleteForm from "./DeleteForm";
import { useRoleContext } from "../../../contexts/RoleContext";

const EmployeeActions = () => {
  const { id, isActive, isRemove, isAdd, isEdit, clearActionParams } =
    useActionSearchParams();
  const { isStaff } = useRoleContext();
  if (isStaff) return null;
  return (
    <Dialog
      keepMounted
      open={isActive}
      onClose={() => clearActionParams()}
      maxWidth={"sm"}
    >
      <Fade in={isActive} timeout={0}>
        <DialogTitle color="secondary">
          {isAdd && "إضافة موظف"}
          {isEdit && "تعديل موظف"}
          {isRemove && "حذف موظف"}
        </DialogTitle>
      </Fade>
      <DialogContent>
        {isEdit && <UpdateForm id={id} />}
        {isAdd && <EmployeeForm />}
        {isRemove && <DeleteForm />}
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeActions;
