import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { FC } from "react";
type Props = IconButtonProps;
const RemoveIconButton: FC<Props> = ({ disabled, ...props }) => {
  if (disabled) {
    return (
      <IconButton disabled={disabled} {...props}>
        <DeleteIcon sx={{ color: "error.main" }} />
      </IconButton>
    );
  }
  return (
    <Tooltip title="حذف">
      <IconButton {...props}>
        <DeleteIcon sx={{ color: "error.main" }} />
      </IconButton>
    </Tooltip>
  );
};
export default RemoveIconButton;
