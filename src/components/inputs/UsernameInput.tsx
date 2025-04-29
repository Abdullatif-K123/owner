import PersonIcon from "@mui/icons-material/Person";
import { InputAdornment } from "@mui/material";
import TextFieldControlled, {
  TextFieldControlledProps,
} from "./TextFieldControlled";

type Props = TextFieldControlledProps;

const UsernameInput = ({ control, name, ...props }: Props) => {
  return (
    <TextFieldControlled
      name={name}
      variant="outlined"
      control={control}
      label="اسم المستخدم"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <PersonIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default UsernameInput;
