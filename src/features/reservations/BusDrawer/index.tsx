import { Box, Drawer } from "@mui/material";
import { toursQueries } from "../../../API/tour/queries";
import Loading from "../../../components/feedback/Loading";
import SomethingWentWrong from "../../../components/feedback/SomethingWentWrong";
import TourSeatSelection from "../Action/TourChairSelection";
import { useReservationsContext } from "../context/ReservationsContext";

const BusDrawer = () => {
  const {
    setIsBusDrawerOpened,
    tourId,
    isBusDrawerOpened,
    setToEdit,
    setIsActionOpened,
  } = useReservationsContext();

  const tourQuery = toursQueries.useDetailsForCustomerQuery(tourId);
  const customersQuery = toursQueries.useCustomersListQuery(tourId);
  const onSeatChoose = (seat: number) => {
    let selectedCustomer = customersQuery.data?.find(
      (customer) => customer.chairNumber === seat
    );
    setToEdit(selectedCustomer ?? null);
    setIsActionOpened(true);
  };

  return (
    <Drawer
      anchor="right"
      open={isBusDrawerOpened}
      onClose={() => setIsBusDrawerOpened(false)}
    >
      <Box sx={{ width: 300, pt: 12, px: 6 }} role="presentation">
        {tourQuery.data && (
          <TourSeatSelection
            onSeatSelection={(seat) => {
              onSeatChoose(seat);
            }}
            tour={tourQuery.data}
            isView={true}
          />
        )}
        {(tourQuery.isLoading || customersQuery.isLoading) && (
          <Loading sx={{ mx: "auto", mt: 10 }} />
        )}
        {(tourQuery.isError || customersQuery.isError) && (
          <SomethingWentWrong sx={{ mx: "auto", mt: 10 }} />
        )}
      </Box>
    </Drawer>
  );
};

export default BusDrawer;
