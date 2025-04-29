import { MenuItem } from "@mui/material";
import { FC } from "react";
import { enumToNumberArray } from "../../utils/transforms";
import { Select, SelectProps } from "./Select";
import { enumTourTranslate } from "../../constants/enumsValues";
type SelectEnumProps = {
  _enum: { [key: string]: any };
  translationPrefix: string;
} & SelectProps;
export const SelectEnum: FC<SelectEnumProps> = ({
  _enum,
  translationPrefix,
  ...props
}) => {
  let arr = enumToNumberArray(_enum);
  return (
    <Select {...props}>
      {arr.map((item) => (
        <MenuItem value={item} key={item}>
          {enumTourTranslate[translationPrefix][item]}
        </MenuItem>
      ))}
    </Select>
  );
};
export default SelectEnum;
