import { useMemo } from "react";
import { toursQueries } from "../../../../API/tour/queries";
import { useReservationsContext } from "../../context/ReservationsContext";

export const useTourChairs = () => {
  const { tourId } = useReservationsContext();

  const { data } = toursQueries.useBookedChairs(tourId);

  return useMemo(() => {
    if (data) return new Map(data.map((chair) => [chair.chairNumber, chair]));
  }, [data]);
};
export default useTourChairs;
