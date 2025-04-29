import { Button } from "@mui/material";
import { useReservationsContext } from "../context/ReservationsContext";

const ShowReservationButton = () => {
  const { setIsBusDrawerOpened } = useReservationsContext();
  return (
    <Button
      type="button"
      variant="contained"
      sx={{
        fontSize: { xs: 10, sm: 15 },
        minWidth: 140,
      }}
      onClick={() => setIsBusDrawerOpened(true)}
    >
      إظهار الحجوزات
    </Button>
  );
};

export default ShowReservationButton;
