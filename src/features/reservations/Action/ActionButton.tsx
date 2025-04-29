import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useReservationsContext } from "../context/ReservationsContext";

const ActionButton = () => {
  const { setIsActionOpened } = useReservationsContext();
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{ position: "fixed !important", bottom: 16, right: 16 }}
      onClick={() => setIsActionOpened(true)}
    >
      <AddIcon style={{ fill: "#fefefe" }} />
    </Fab>
  );
};

export default ActionButton;
