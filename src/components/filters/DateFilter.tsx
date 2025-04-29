import { Popper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "../inputs/TextField";
import dayjs, { Dayjs } from "dayjs";
import { FC, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
export type DateFilterProps = { name: string; label: string; initial?: Dayjs };
export const DateFilter: FC<DateFilterProps> = ({ label, name, initial }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get(name) ? dayjs(searchParams.get(name)) : null;

  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const handleChange = (value: Dayjs | null) => {
    setSearchParams((searchParams) => {
      if (value) searchParams.set(name, value.toISOString());
      else searchParams.delete(name);
      return searchParams;
    });
  };
  useEffect(() => {
    setTimeout(() => setAnchorEl(anchorRef?.current), 1);
  }, [anchorRef]);

  return (
    <DatePicker
      slots={{
        popper: (params) => <Popper anchorEl={anchorEl} {...params} />,
        textField: ({ ref: _, ...params }) => (
          <TextField fullWidth ref={anchorRef} size="small" {...params} />
        ),
      }}
      label={label}
      defaultValue={initial || null}
      value={date}
      onChange={handleChange}
      sx={{ width: "2rem !important" }}
    />
  );
};
export default DateFilter;
