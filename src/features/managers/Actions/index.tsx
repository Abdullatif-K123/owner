import { Dialog, DialogContent, DialogTitle, Fade } from "@mui/material";
import UpdateForm from "./UpdateForm";
import ManagerForm from "./ManagerForm";
import useActionSearchParams from "../../../hooks/useActionSearchParams";
import DeleteForm from "./DeleteForm";
import { useRoleContext } from "../../../contexts/RoleContext";

const ManagerActions = () => {
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
          {isAdd && "إضافة مدير"}
          {isEdit && "تعديل مدير"}
          {isRemove && "حذف مدير"}
        </DialogTitle>
      </Fade>
      <DialogContent>
        {isEdit && <UpdateForm id={id} />}
        {isAdd && <ManagerForm />}
        {isRemove && <DeleteForm />}
      </DialogContent>
    </Dialog>
  );
};

export default ManagerActions;
