// *******************************************
// Dear devs...
// I didn't create this mess but I was forced
//  to work with it, and so are you.
// *******************************************

import { useEffect } from "react";
import { Box, Grid, Stack, SxProps } from "@mui/material";
import Chair from "./Chair";
import useTourChairs from "./useTourChairs";
import { TourDetailsForCustomer } from "../../../../API/tour/types";
import busImg from "@/assets/images/bus-interior.svg";
import Horn from "@/features/reservations/Action/TourChairSelection/Horn";
import { ChairSelectionSX } from "@/features/reservations/Action/TourChairSelection/style.sx";
import Help from "@/features/reservations/Action/TourChairSelection/Help";

export type TourSeatSelectionProps = {
  tour: TourDetailsForCustomer;
  onSeatSelection?: (seat: number) => void;
  currentlyBookedOn?: number;
  selected?: number;
  isView?: boolean;
  sx?: SxProps;
};
export const TourSeatSelection = ({
  selected,
  onSeatSelection,
  currentlyBookedOn,
  tour,
  isView,
  sx,
}: TourSeatSelectionProps) => {
  const bookedChairs = useTourChairs();

  useEffect(() => {
    if (currentlyBookedOn)
      if (selected && bookedChairs?.get(selected))
        onSeatSelection?.(currentlyBookedOn);
  }, [bookedChairs]);

  const rowsCount =
    tour.model.module.length / tour.model.columnCount +
    (tour.model.module.length % tour.model.columnCount === 0 ? 0 : 1);

  const rowHeight = (1 / rowsCount) * 100;

  return (
    <>
      <Box sx={{ ...ChairSelectionSX.bus, ...sx }}>
        <Box
          sx={ChairSelectionSX.busGround}
          draggable={false}
          component="img"
          src={busImg}
        />
        <Horn />
        <Box sx={ChairSelectionSX.seatsContainer}>
          <Grid container height="100%" spacing={1}>
            {tour.model.module.map((seat, index) =>
              bookedChairs && seat ? (
                <Chair
                  clickable={
                    bookedChairs !== null &&
                    (!bookedChairs.has(seat) ||
                      isView ||
                      currentlyBookedOn === seat)
                  }
                  bookId={
                    seat && currentlyBookedOn !== seat
                      ? bookedChairs.get(seat)?.customerId
                      : undefined
                  }
                  isCompleted={bookedChairs.get(seat)?.isCompleted}
                  chairNumber={seat}
                  cols={tour.model.columnCount}
                  rowHeight={rowHeight}
                  key={index}
                  onToggleSelect={() => {
                    onSeatSelection?.(seat);
                  }}
                  selected={selected === seat}
                  isView={isView ?? false}
                  isPrimary={
                    bookedChairs !== null &&
                    bookedChairs.has(seat) &&
                    bookedChairs.get(seat)?.isPrimary
                  }
                  isSecondary={
                    bookedChairs !== null &&
                    bookedChairs.has(seat) &&
                    bookedChairs.get(seat)?.isSecondary
                  }
                />
              ) : (
                <Chair
                  bookId={seat ? "loading" : undefined}
                  chairNumber={seat}
                  cols={tour.model.columnCount}
                  rowHeight={rowHeight}
                  key={index}
                />
              )
            )}
          </Grid>
          <Stack
            direction={"row"}
            gap={1}
            sx={{
              alignItems: "end",
              justifyContent: "center",
              position: "fixed",
              right: 0,
              left: 0,
              bottom: 9,
            }}
          ></Stack>
        </Box>
      </Box>
      <Help />
    </>
  );
};
export default TourSeatSelection;
