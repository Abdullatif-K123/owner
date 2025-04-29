import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";
import ar from "date-fns/locale/ar-EG";
import useIsoToDate from "../../../hooks/useIsoToDate";
import useDateToIso from "../../../hooks/useDateToIso";

type Props = {
  value: string;
  onChange: (val: string) => void;
  label: string;
};

const DateTimePickerComp = ({ value, onChange, label }: Props) => {
  const onValChange = (val: any) => {
    onChange(useDateToIso(val));
  };

  return (
    <LocalizationProvider adapterLocale={ar} dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={label}
        value={useIsoToDate(value)}
        onChange={onValChange}
        sx={{ width: { xs: "14rem", sm: "18rem" } }}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerComp;
