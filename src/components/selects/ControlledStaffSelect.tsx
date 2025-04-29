import StaffAutocomplete from "@/components/selects/StaffAutocomplete";
import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

export type Props = {
  control: Control<any, any>;
  name: string;
  defaultValue?: string;
  branchId?: string | null;
} & TextFieldProps;

const ControlledStaffSelect = ({
  control,
  name,
  branchId,
  ...props
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
        <StaffAutocomplete
          onChange={(_, value) => {
            onChange(value?.id);
          }}
          branchId={branchId ?? null}
          fullWidth
          renderInput={(params) => (
            <TextField
              error={!!error}
              helperText={error && error.message}
              {...rest}
              {...props}
              required
              {...params}
              {...props}
            />
          )}
        />
      )}
    />
  );
};

export default ControlledStaffSelect;
