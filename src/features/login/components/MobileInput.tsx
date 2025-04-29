import { Box, InputBase, InputLabel, Typography } from "@mui/material";
import React, { FC, useEffect, useRef } from "react";
import { FieldError } from "react-hook-form";

type Props = {
  value: string;
  onChange: (val: string) => void;
  error: FieldError | undefined;
};

const MobileInput: FC<Props> = ({ onChange, error }) => {
  const phoneInput = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phoneInput.current) {
      if (error) {
        phoneInput.current.style.borderColor = "#d32f2f";
      } else {
        phoneInput.current.style.borderColor = "#4B7175";
      }
    }
  }, [error]);

  const onFocus = () => {
    phoneInput.current !== null
      ? (phoneInput.current.style.borderWidth = "2px")
      : null;
  };

  const onBlur = (
    _e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    phoneInput.current !== null
      ? (phoneInput.current.style.borderWidth = "1px")
      : null;
  };

  return (
    <>
      <InputLabel
        sx={{
          typography: "subtitle1",
          color: "primary.main",
          position: "relative",
          left: 10,
          top: 20,
        }}
      >
        رقم الموبايل
      </InputLabel>
      <Box
        ref={phoneInput}
        sx={{
          display: "flex",
          height: "3.5rem",
          maxWidth: "24rem",
          px: 1,
          border: 1.5,
          borderColor: "primary.main",
          borderRadius: "20px",
        }}
      >
        <InputBase
          onFocus={onFocus}
          onBlur={(e) => onBlur(e)}
          onChange={(e) => {
            const input = e.target as HTMLInputElement;
            if (input.value[0] === "0" && input.value.length > 1)
              input.value = input.value.slice(1);
            onChange(input.value.replaceAll(/[^0-9]/g, ""));
          }}
          dir="ltr"
          type="tel"
          placeholder="9xxxxxxxx"
          id="logIn"
          sx={{
            ml: 1,
            width: "85%",
            color: "primary.main",
          }}
        />
        <Typography
          dir="ltr"
          variant="body1"
          component="p"
          sx={{
            my: "auto",
            ml: 1,
            py: 0.5,
            px: 1,
            borderLeft: 1,
            borderColor: "primary.main",
            color: "primary.main",
          }}
        >
          +963
        </Typography>
      </Box>
    </>
  );
};

export default MobileInput;
