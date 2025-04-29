import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Checkbox, Stack, TableCell } from "@mui/material";
import TableRowStriped from "../../../components/tables/PaginationTable/TableRowStriped";
import GenderText from "../../../components/typography/GenderText";
import { BookingType, BookingTypeAr } from "../../../constants/enums";
import useIsoToArabicDate from "../../../hooks/useIsoToArabicDate";
import { TourCustomer } from "../../../API/tour/types";
import { useReservationsContext } from "../context/ReservationsContext";
import PaymentTypeText from "@/components/typography/PaymentTypeText";
import { moneyFormatter } from "@/utils/transforms";

export type CustomerRowProps = {
  data: TourCustomer;
};

export const CustomerRow = ({ data }: CustomerRowProps) => {
  const {
    isSelectionEnabeld,
    toggleToCancel,
    setToEdit,
    setToCancel,
    setIsActionOpened,
    toCancelChair,
  } = useReservationsContext();

  const handleRowClick = () => {
    if (isSelectionEnabeld) {
      toggleToCancel(data.tourCustomerChairId);
      setToCancel(data);
    } else {
      setToEdit(data);
      setIsActionOpened(true);
    }
  };

  const isChecked = data.tourCustomerChairId === toCancelChair[0];
  const mustColor =
    data.mustColor &&
    data.employeeName &&
    data.employeeName.trim().length !== 0;
  return (
    <TableRowStriped
      sx={{
        cursor: "pointer",
        bgcolor: mustColor ? "#fff591 !important" : "white",
      }}
      onClick={handleRowClick}
    >
      <TableCell width={50} sx={{ p: 0 }}>
        {isSelectionEnabeld && (
          <Checkbox
            color="error"
            sx={{ svg: { color: "error.main" } }}
            checked={isChecked}
          />
        )}
      </TableCell>
      <TableCell>{data.customerName}</TableCell>
      <TableCell>
        <Box sx={{ direction: "rtl" }}>{data.customerPhoneNumber}</Box>
      </TableCell>
      <TableCell>{data.firstName}</TableCell>
      <TableCell>{data.lastName}</TableCell>
      <TableCell>
        <GenderText gender={data.gender} />
      </TableCell>
      <TableCell>
        <Box sx={{ direction: "rtl" }}>{data.phomeNumber}</Box>
      </TableCell>
      <TableCell>{data.nationalNumber}</TableCell>
      <TableCell>{data.chairNumber}</TableCell>
      <TableCell>{moneyFormatter.format(data.amount)}</TableCell>
      <TableCell sx={{ p: 0 }}>
        {useIsoToArabicDate(data.boockingDate)}
      </TableCell>
      <TableCell>
        <Stack sx={{ alignItems: "center" }}>
          {data.isPaid ? (
            <CheckIcon />
          ) : (
            <ClearIcon sx={{ color: "secondary.main" }} />
          )}
        </Stack>
      </TableCell>
      <TableCell>
        <PaymentTypeText paymentType={data.paymentType} />
      </TableCell>
      <TableCell>{BookingTypeAr[BookingType[data.bookingType]]}</TableCell>
      <TableCell>{data.employeeName}</TableCell>
    </TableRowStriped>
  );
};
