import ReservationsContent from "@/features/reservations/Content";
import { pageTitle } from "@/utils/pageTitle";

const Reservations = () => {
  pageTitle("الحجوزات");
  return <ReservationsContent />;
};

export default Reservations;
