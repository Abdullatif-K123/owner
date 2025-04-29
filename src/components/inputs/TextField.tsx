import { styled, TextField as MuiTextField } from "@mui/material";
const TextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => prop !== "required",
})(({ required, theme }) => ({
  paddingLeft: 3,
  "label::after": {
    content: required ? '"*"' : '""',
    padding: "1px",
    color: theme.palette.error.main,
  },
}));

export default TextField;
