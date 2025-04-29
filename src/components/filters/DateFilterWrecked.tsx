import { Popper } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ar from "date-fns/locale/ar-EG";
import TextField from "../inputs/TextField";
import dayjs, { Dayjs } from "dayjs";
import { FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDateToIso from "../../hooks/useDateToIso";
// import useDateToIso from "../../hooks/useDateToIso";
// import useIsoToDate from "../../hooks/useIsoToDate";

const useIsoToDate = (value: string | null, offset?: number) => {
  if (value && value.length > 0) {
    return dayjs(value).add(
      offset !== undefined && offset !== null ? offset : 0,
      "hours"
    ); // Create Dayjs object
  } else {
    return null;
  }
};

export type DateFilterProps = { name: string; label: string; initial?: Dayjs };

export const DateFilterWrecked: FC<DateFilterProps> = ({ label, name, initial }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get(name)
    ? useIsoToDate(searchParams.get(name))
    : null;

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleChange = (value: Dayjs | null) => {
    setSearchParams((searchParams) => {
      if (value) searchParams.set(name, useDateToIso(value.toString()));
      else searchParams.delete(name);
      return searchParams;
    });
  };
  useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);

  return (
    <LocalizationProvider adapterLocale={ar} dateAdapter={AdapterDateFns}>
      <DatePicker
        slots={{
          popper: (params) => <Popper anchorEl={anchorEl} {...params} />,
          textField: ({ ref: _, ...params }) => (
            <TextField fullWidth ref={anchorRef} size="small" {...params} />
          ),
        }}
        label={label}
        defaultValue={initial}
        value={date && dayjs(date)}
        onChange={handleChange}
      />
    </LocalizationProvider>
  );
};
export default DateFilterWrecked;
