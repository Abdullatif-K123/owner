import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useActionSearchParams from "../../../hooks/useActionSearchParams";

const CloseButton = () => {
  const { clearActionParams } = useActionSearchParams();
  return (
    <Button
      sx={{ width: 46, height: 46, position: "fixed", top: 12, right: 12 }}
      onClick={() => clearActionParams()}
    >
      <CloseIcon />
    </Button>
  );
};

export default CloseButton;
