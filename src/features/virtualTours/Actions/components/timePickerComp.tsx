import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ar from "date-fns/locale/ar-EG";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import useIsoToDate from "@/hooks/useIsoToDate";
import useDateToIso from "@/hooks/useDateToIso";

type Props = {
  value: string;
  onChange: (val: string) => void;
  label: string;
};

const TimePickerComp = ({ value, onChange, label }: Props) => {
  const onValChange = (val: any) => {
    onChange(useDateToIso(val));
  };

  return (
    <LocalizationProvider adapterLocale={ar} dateAdapter={AdapterDateFns}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          label={label}
          value={useIsoToDate(value)}
          onChange={onValChange}
          sx={{ width: { xs: "14rem", sm: "18rem" } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimePickerComp;
