import { useState, useRef, useEffect } from "react";
import { Box, OutlinedInput } from "@mui/material";
import { pinInputSx } from "../../AuthLayout/style";

type Props = {
  onChange: any;
};

type Values = {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
};

const PinInput = ({ onChange }: Props) => {
  const [values, setValues] = useState<Values>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  const one = useRef<HTMLInputElement>(null);
  const two = useRef<HTMLInputElement>(null);
  const three = useRef<HTMLInputElement>(null);
  const four = useRef<HTMLInputElement>(null);
  const five = useRef<HTMLInputElement>(null);
  const six = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let finalValue = "";
    let valuesArr = Object.values(values);
    valuesArr.forEach((val) => (finalValue += val));
    onChange(finalValue);
  }, [values]);

  let regex = /[^0-9]+/;

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    // Fix this any Please!
    nextField: any,
    prevField: any
  ) => {
    if (!regex.test(e.key) || e.keyCode === 8) {
      if (e.keyCode === 8) {
        setTimeout(() => {
          nextField !== null ? prevField.focus() : "";
        }, 100);
      } else {
        setTimeout(() => {
          nextField !== null ? nextField.focus() : "";
        }, 100);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const val: any = e.target.value;
    if (!regex.test(val)) {
      setValues((prev: any) => {
        return { ...prev, [index]: val === "" ? "" : val };
      });
    }
  };

  return (
    <>
      <Box
        dir="ltr"
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <OutlinedInput
          inputRef={one}
          onChange={(e) => handleChange(e, 0)}
          value={values[0]}
          autoFocus
          onKeyDown={(e) => onKeyDown(e, two.current, one.current)}
          type="tel"
          inputProps={{
            maxLength: "1",
            style: { textAlign: "center", padding: 0 },
          }}
          sx={pinInputSx}
          placeholder="-"
        />
        <OutlinedInput
          inputRef={two}
          onChange={(e) => handleChange(e, 1)}
          value={values[1]}
          onKeyDown={(e) => onKeyDown(e, three.current, one.current)}
          inputProps={{
            maxLength: "1",
            style: { textAlign: "center", padding: 0 },
          }}
          sx={pinInputSx}
          type="tel"
          placeholder="-"
        />
        <OutlinedInput
          onChange={(e) => handleChange(e, 2)}
          value={values[2]}
          inputRef={three}
          onKeyDown={(e) => onKeyDown(e, four.current, two.current)}
          inputProps={{
            maxLength: "1",
            style: { textAlign: "center", padding: 0 },
          }}
          sx={pinInputSx}
          type="tel"
          placeholder="-"
        />
        <OutlinedInput
          onChange={(e) => handleChange(e, 3)}
          value={values[3]}
          inputRef={four}
          onKeyDown={(e) => onKeyDown(e, five.current, three.current)}
          inputProps={{
            maxLength: "1",
            style: { textAlign: "center", padding: 0 },
          }}
          sx={pinInputSx}
          type="tel"
          placeholder="-"
        />
        <OutlinedInput
          onChange={(e) => handleChange(e, 4)}
          value={values[4]}
          inputRef={five}
          onKeyDown={(e) => onKeyDown(e, six.current, four.current)}
          inputProps={{
            maxLength: "1",
            style: { textAlign: "center", padding: 0 },
          }}
          sx={pinInputSx}
          type="tel"
          placeholder="-"
        />
        <OutlinedInput
          onChange={(e) => handleChange(e, 5)}
          value={values[5]}
          inputRef={six}
          onKeyDown={(e) => onKeyDown(e, six.current, five.current)}
          inputProps={{
            maxLength: "1",
            style: { textAlign: "center", padding: 0 },
          }}
          sx={pinInputSx}
          type="tel"
          placeholder="-"
        />
      </Box>
    </>
  );
};

export default PinInput;
