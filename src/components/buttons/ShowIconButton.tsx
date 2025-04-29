import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";

type Props = IconButtonProps & { title?: string };

const ShowIconButton = ({ title = "عرض", disabled, ...props }: Props) => {
  if (disabled) {
    return (
      <IconButton disabled={disabled} {...props}>
        <VisibilityIcon sx={{ color: "primary" }} />
      </IconButton>
    );
  }
  return (
    <Tooltip title={title}>
      <IconButton {...props}>
        <VisibilityIcon sx={{ color: "primary" }} />
      </IconButton>
    </Tooltip>
  );
};
export default ShowIconButton;
