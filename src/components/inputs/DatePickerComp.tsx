import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import ar from "date-fns/locale/ar-EG";
import useDateToIso from "@/hooks/useDateToIso";
import useIsoToDate from "@/hooks/useIsoToDate";
import { SxProps } from "@mui/material";

type Props = {
  value?: string;
  onChange?: (val: string) => void;
  label: string;
  sx?: SxProps;
  defaultValue?: string | Date | null;
  small?: boolean;
  clearable?: boolean;
  required?: boolean;
};

const DatePickerComp = ({
  value = "",
  defaultValue,
  onChange,
  label,
  sx,
  small,
  clearable,
  required,
}: Props) => {
  if (value === "0001-01-01T00:00:00") value = "";
  const onValChange = (val: any) => {
    if (onChange) onChange(useDateToIso(val));
  };

  return (
    <LocalizationProvider adapterLocale={ar} dateAdapter={AdapterDateFns}>
      <DatePicker
        slotProps={{
          textField: { size: small ? "small" : "medium", required },
          field: { clearable },
        }}
        defaultValue={defaultValue}
        label={label}
        value={useIsoToDate(value)}
        onChange={onValChange}
        sx={{ w: "100%", ...sx }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComp;
