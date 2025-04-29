import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { Radio } from "@mui/material";
import { FC } from "react";

type Props = {
  onChange: (val: number | boolean) => void;
  label: string;
  valuesLabel: string[];
  values: (number | boolean | string)[];
  value?: boolean;
};

const RadioInput: FC<Props> = ({
  onChange,
  label,
  valuesLabel,
  values,
  value,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (typeof values[0] === "boolean") {
      onChange(value === "true");
    } else {
      onChange(Number(value));
    }
  };

  return (
    <FormControl sx={{ width: "220px" }}>
      <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={(e) => handleChange(e)}
        value={value}
      >
        <FormControlLabel
          value={values[0]}
          control={<Radio />}
          label={valuesLabel[0]}
        />
        <FormControlLabel
          value={values[1]}
          control={<Radio />}
          label={valuesLabel[1]}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
