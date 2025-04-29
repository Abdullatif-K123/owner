import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {
  value: number;
  onChange: (val: number) => void;
};

const TimePickerComp = ({ value, onChange }: Props) => {
  const onValChange = (val: Dayjs | null) => {
    const res = dayjs(val).minute();
    onChange(res);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        sx={{ width: "20rem" }}
        onChange={(val) => onValChange(val)}
        value={dayjs(`2022-04-17T15:${value}`)}
        minutesStep={5}
        views={["minutes"]}
        format="mm"
      />
    </LocalizationProvider>
  );
};

export default TimePickerComp;
