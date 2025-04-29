import { IconButton, Stack, Typography } from "@mui/material";
import BusSeatIcon from "@/components/icons/BusSeatIcon";
import themeConstants from "@/constants/themeConstants";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { SnackbarProps, useSnackbarContext } from "@/contexts/snackBarContext";

const ChairProperties = {
  Booked: {
    msg: "محجوز من التطبيق",
    bgcolor: themeConstants.secondary,
    color: "#fff",
  },
  Primary: { msg: "أساسي", bgcolor: "gold", color: "#fff" },
  Secondary: {
    msg: "غير أساسي",
    bgcolor: "#872fc9",
    color: "#fff",
  },
  Female: {
    msg: "تم التحديد لانثى",
    bgcolor: "#E547A1",
    color: "#fff",
  },
  Male: { msg: "تم التحديد لذكر", bgcolor: "#029EF6", color: "#fff" },
  Available: {
    msg: "تم إكمال معلومات الأمنية",
    bgcolor: themeConstants.primary,
    color: "#f0f0f0",
  },
};

const helpSnackBar: SnackbarProps = {
  message: <HelpContent />,
  severity: "info",
  snackBarProps: {
    anchorOrigin: { horizontal: "center", vertical: "top" },
    // sx: { right: "auto" },
    autoHideDuration: 6000,
  },
  alertProps: {
    icon: <></>,
    sx: {
      borderRadius: 2,
      alignItems: "start",
      flexDirection: "row-reverse",
      bgcolor: "primary.50",
    },
    onClose: undefined,
  },
};
export const Help = ({}) => {
  const snackbar = useSnackbarContext();

  const handleHelpOpen = () => {
    snackbar(helpSnackBar);
  };
  return (
    <>
      <IconButton
        sx={{
          margin: "auto",
          display: "block",
          svg: { width: "30px", height: "30px" },
        }}
        onClick={handleHelpOpen}
      >
        <InfoOutlinedIcon />
      </IconButton>
    </>
  );
};
export default Help;

function HelpContent() {
  return (
    <Stack
      sx={{
        gap: 1,
        width: "max-content",
        "*": { textAlign: "start" },
        ".seat": {
          flexDirection: "row",
          height: 20,
          gap: 1,
          alignItems: "center",
        },
        svg: {
          height: "100%",
          width: "2rem",
          filter: "drop-shadow( 1px 1px 2px rgba(0, 0, 0, .7))",
        },
      }}
    >
      {Object.entries(ChairProperties).map(([status, properties]) => (
        <Stack className="seat" key={status}>
          <BusSeatIcon color={properties.bgcolor} />
          <Typography sx={{ mx: 3 }}>{properties.msg}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}
