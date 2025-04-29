import { MenuItem, SelectChangeEvent } from "@mui/material";
import { Select, SelectProps } from "../selects/Select";
import { PaidType } from "../../constants/enums";
import useNumberEnumSearchParam from "../../hooks/useNumberEnumSearchParam";
import { useSearchParams } from "react-router-dom";

type Props = {
  name: string;
  label: string;
  trueName?: string;
  falseName?: string;
} & Omit<SelectProps, "name" | "label">;

const BooleanSelect = ({
  name,
  label,
  trueName = "نعم",
  falseName = "لا",
  ...props
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paidType = useNumberEnumSearchParam<PaidType>(name) ?? "";

  const handleRecordChange = (e: SelectChangeEvent<any>) => {
    searchParams.set(name, e.target.value);
    setSearchParams(searchParams);
  };
  const handleClear = () => {
    searchParams.delete(name);
    setSearchParams(searchParams);
  };
  return (
    <Select
      {...props}
      size="small"
      value={paidType}
      label={label}
      onClear={handleClear}
      onChange={handleRecordChange}
    >
      <MenuItem value={0}>{falseName}</MenuItem>
      <MenuItem value={1}>{trueName}</MenuItem>
    </Select>
  );
};
export default BooleanSelect;
