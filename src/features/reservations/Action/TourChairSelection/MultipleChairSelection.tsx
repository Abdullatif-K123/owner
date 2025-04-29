import { useEffect } from "react";
import { Box, Grid, Stack, SxProps } from "@mui/material";

import Chair from "./Chair";
import busImg from "@/assets/images/bus-interior.svg";
import { ChairSelectionSX } from "@/features/reservations/Action/TourChairSelection/style.sx";
import Horn from "@/features/reservations/Action/TourChairSelection/Horn";
import { ChairType, TourDetailsForCustomer } from "../../../../API/tour/types";
import useTourChairs from "./useTourChairs";
import { Gender } from "@/constants/enums";
import Help from "@/features/reservations/Action/TourChairSelection/Help";

export type MultipleChairSelectionProps = {
  tour: TourDetailsForCustomer;
  onSeatSelection?: (seats: ChairType[]) => void;
  currentlyBookedOn?: number;
  selectedGender: Gender;
  selectedChairs: ChairType[];
  isView?: boolean;
  sx?: SxProps;
};

export const MultipleChairSelection = ({
  selectedGender,
  selectedChairs,
  onSeatSelection,
  tour,
  isView,
  sx,
}: MultipleChairSelectionProps) => {
  const bookedChairs = useTourChairs();

  useEffect(() => {
    const chairs = selectedChairs.filter(
      (seat) => !bookedChairs?.get(seat.chairNumber)
    );
    if (chairs.length !== selectedChairs.length) onSeatSelection?.(chairs);
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
                    bookedChairs !== null && (!bookedChairs.has(seat) || isView)
                  }
                  bookId={seat ? bookedChairs.get(seat)?.customerId : undefined}
                  chairNumber={seat}
                  cols={tour.model.columnCount}
                  rowHeight={rowHeight}
                  key={index}
                  onToggleSelect={() => {
                    const existedChair = selectedChairs.find(
                      (el) => el.chairNumber === seat
                    );
                    let chairs = selectedChairs;
                    if (existedChair) {
                      chairs = chairs.filter(
                        (chair) =>
                          existedChair.chairNumber !== chair.chairNumber
                      );
                    } else {
                      chairs.push({
                        chairNumber: seat,
                        gender: selectedGender,
                      });
                    }
                    onSeatSelection?.(chairs);
                  }}
                  gender={
                    selectedChairs.find((chair) => chair.chairNumber === seat)
                      ?.gender ?? Gender.Male
                  }
                  selected={
                    !!selectedChairs.find((chair) => chair.chairNumber === seat)
                  }
                  isView={isView ?? false}
                  isCompleted={bookedChairs.get(seat)?.isCompleted}
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
export default MultipleChairSelection;
