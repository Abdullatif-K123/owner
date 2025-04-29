import EditIcon from "@mui/icons-material/Edit";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { FC } from "react";

type Props = IconButtonProps;
const EditIconButton: FC<Props> = ({ disabled, ...props }) => {
  if (disabled)
    return (
      <IconButton disabled={disabled} {...props}>
        <EditIcon sx={{ color: "primary" }} />
      </IconButton>
    );
  return (
    <Tooltip title="تعديل">
      <IconButton {...props}>
        <EditIcon sx={{ color: "primary" }} />
      </IconButton>
    </Tooltip>
  );
};
export default EditIconButton;
