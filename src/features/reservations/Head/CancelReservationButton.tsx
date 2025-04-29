import LoadingButton from "../../../components/buttons/LoadingButton";
import { useReservationsContext } from "../context/ReservationsContext";

const CancelReservationButton = () => {
  const {
    isSelectionEnabeld,
    toCancelChair,
    isCanceling,
    handleCancelButtonClick,
    // reservationsQuery,
  } = useReservationsContext();
  const label = isSelectionEnabeld
    ? toCancelChair.length === 0
      ? "تراجع"
      : "حفظ الغاء الحجز"
    : "إلغاء حجز";
  //  !reservationsQuery.data?.pages[0]?.data[0].canCancel

  let disabled = false;
  // reservationsQuery.data?.pages[0]?.data?.length
  // ? reservationsQuery.data.pages[0].data[0].canCancel
  // :
  //  !reservationsQuery.data?.pages[0]?.data[0].canCancel;
  return (
    <LoadingButton
      label={label}
      disabled={disabled}
      isLoading={isCanceling}
      sx={{
        fontSize: { xs: 10, sm: 15 },
        minWidth: 140,
      }}
      onClick={handleCancelButtonClick}
    />
  );
};

export default CancelReservationButton;
