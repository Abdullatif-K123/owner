import { VisibilityOff } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import TextFieldControlled, {
  TextFieldControlledProps,
} from "./TextFieldControlled";

type Props = TextFieldControlledProps;
const PasswordInput = ({ control, name, ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextFieldControlled
      name={name}
      variant="outlined"
      control={control}
      label="كلمة المرور"
      autoComplete={"off"}
      type={showPassword ? "text" : "password"}
      fullWidth
      onInput={(e) => {
        const input = e.target as HTMLInputElement;
        input.value = input.value.trim();
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              // sx={{ p: 0 }}
              tabIndex={1}
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
export default PasswordInput;
