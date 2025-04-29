import { TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import TextField from "./TextField";

export type TextFieldControlledProps = {
  control: Control<any, any>;
  name: string;
} & TextFieldProps;

const TextFieldControlled = ({
  control,
  name,
  ...props
}: TextFieldControlledProps) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            error={!!error}
            helperText={error && error.message}
            {...field}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default TextFieldControlled;
