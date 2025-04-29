import {
  Box,
  ButtonBase,
  Grid,
  Skeleton,
  Tooltip,
  Typography,
  styled,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";

import BusSeatIcon from "../../../../components/icons/BusSeatIcon";
import { FC } from "react";
import { Gender } from "@/constants/enums";
import useTourChairs from "./useTourChairs";

export type ChairPropertiesValue = { bgcolor: string; color: string };

export type BusChairProps = {
  chairNumber: number | null | false;
  cols: number;
  rowHeight: number;
  clickable?: boolean;
  bookId: string | undefined;
  onClick: () => void;
  chairProperties: ChairPropertiesValue;
  gender?: Gender;
};
const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  [`& .MuiTooltip-arrow`]: {
    color: theme.palette.common.white,
  },
}));

export const BusChair: FC<BusChairProps> = ({
  cols,
  rowHeight,
  chairNumber,
  clickable,
  bookId,
  onClick,
  chairProperties,
  gender,
}) => {
  const bookedChairs = useTourChairs();
  const chairDetails =
    chairNumber !== false && chairNumber !== null && bookedChairs
      ? bookedChairs.get(chairNumber)
      : undefined;

  const chairGender = chairDetails ? chairDetails.gender : gender;

  const genderLabel =
    chairGender === Gender.Female
      ? "أنثى"
      : chairGender === undefined
      ? "غير محجوز"
      : "ذكر";

  const handleClick = () => {
    if (!clickable) return;
    onClick();
  };

  return (
    <Grid
      item
      xs={12 / cols}
      component={ButtonBase}
      disableRipple
      tabIndex={
        chairNumber !== null && bookId !== "loading" && clickable ? 0 : -1
      }
      onClick={handleClick}
      sx={{
        height: `${rowHeight}%`,
        "&:focus-visible .chair": {
          borderRadius: 1,
          outline: (th) => `2px solid ${th.palette.primary.main}`,
        },
        svg: {
          width: "100%",
          height: "100%",
          path: {
            transition: "0.3s fill, 0.3s color",
          },
        },
        ".skeleton": { aspectRatio: "1/1.5", width: "80%", mx: "auto" },
      }}
    >
      {chairNumber !== null && bookId !== "loading" && (
        <StyledTooltip
          title={
            <span
              style={{
                fontSize: "15px",
                color: chairGender
                  ? "violet"
                  : chairGender === 0
                  ? "#0073e6"
                  : "gray",
              }}
            >
              {genderLabel}
            </span>
          }
          arrow
          placement="top"
        >
          <Box
            className="chair"
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <BusSeatIcon color={chairProperties.bgcolor} />
            <Typography
              sx={{
                position: "absolute",
                cursor: clickable ? "pointer" : "default",
                userSelect: "none",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                color: chairProperties.color,
                fontSize: "clamp(10px,1.5vw,12px)",
                fontWeight: "bold",
              }}
            >
              {chairNumber}
            </Typography>
          </Box>
        </StyledTooltip>
      )}
      {chairNumber !== null && bookId === "loading" && (
        <Skeleton className="skeleton" />
      )}
    </Grid>
  );
};
