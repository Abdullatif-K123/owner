import { SxProps } from "@mui/material";

export const ChairSelectionSX = {
  bus: {
    mx: "auto",
    mt: 1,
    position: "relative",
    aspectRatio: "134/335",
  },
  busGround: {
    position: "absolute",
    zIndex: 1,
    inset: 0,
    svg: { width: "100%", height: "100%" },
  },
  honk: {
    direction: "rtl",
    position: "absolute",
    zIndex: 3,
    borderRadius: "50%",
    top: "2%",
    cursor: "pointer",
    right: "6%",
    width: "23%",
    aspectRatio: "1",
    svg: { width: "100%", height: "100%" },
  },
  seatsContainer: {
    direction: "rtl",
    position: "relative",
    zIndex: 2,
    mx: 2,
    height: "79%",
    top: "15%",
  },
} as const satisfies SxProps;
