import { useEffect, useRef, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import ar from "date-fns/locale/ar-EG";
import { Popper, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import useDateToIso from "@/hooks/useDateToIso";
import useIsoToDate from "@/hooks/useIsoToDate";

type Props = {
  label: string;
  name: string;
};

const DatePickerFilter = ({ name, label }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get(name) ? searchParams.get(name) : null;

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const onValChange = (val: any) => {
    if (val) searchParams.set(name, useDateToIso(val));
    else searchParams.delete(name);
    setSearchParams(searchParams);
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
        value={useIsoToDate(date)}
        onChange={onValChange}
        sx={{ width: "100%" }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerFilter;
