import { SxProps } from "@mui/material";

export const loadingButtonSx = {
  typography: "h6",
  "&:focus": {
    outline: "none",
  },
  border: "none",
  height: "3.5rem",
  width: "100%",
  borderRadius: "20px",
  transition: "100ms",
  "&:active": { transform: "scale(0.98)" },
} as const satisfies SxProps;
