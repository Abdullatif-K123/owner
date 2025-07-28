import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Cities } from "../../../API/auth/types";

type Props = {
  label: string;
  data: Cities;
  onChange: (val: string) => void;
  value: string | undefined;
  isCity: boolean;
  width?: number | string;
  error?: boolean;
};

const DropDownInput = ({
  label,
  data,
  onChange,
  value,
  isCity,
  width,
  error = false,
}: Props) => {
  const getValue = () => {
    let matched = data?.find((item) => item.id === value);
    let finalVal = matched === undefined ? "" : matched.id;
    return finalVal;
  };

  return (
    <FormControl sx={{ width: { xs: "14rem", sm: width ?? "12rem" } }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        error={error}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue=""
        value={isCity ? value : getValue()}
        label={label}
        onChange={(e) => {
          onChange(e.target.value as string);
        }}
      >
        {data !== undefined ? (
          data.length > 0 ? (
            data.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="" sx={{ color: "error !important" }}>
              لا يوجد
            </MenuItem>
          )
        ) : null}
      </Select>
    </FormControl>
  );
};

export default DropDownInput;
