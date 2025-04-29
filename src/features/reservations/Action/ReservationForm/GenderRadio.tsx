import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Gender } from "@/constants/enums";

export type GenderRadioProps = {
  value: any;
  onChange: (...event: any[]) => void;
  label: string;
};
export const GenderRadio = ({ value, onChange, label }: GenderRadioProps) => {
  return (
    <>
      <FormControl sx={{ pl: 2 }}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup
          onChange={onChange}
          value={value}
          row
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <FormControlLabel
            value={Gender.Male}
            sx={{ flex: 1, justifyContent: "center" }}
            control={<Radio />}
            label="ذكر"
          />
          <FormControlLabel
            value={Gender.Female}
            control={<Radio />}
            label="أنثى"
            sx={{
              flex: 1,
              justifyContent: "center",
            }}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};
export default GenderRadio;
