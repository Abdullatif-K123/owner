import { SelectChangeEvent } from "@mui/material";
import { SelectProps } from "../selects/Select";
import SelectEnum from "../selects/SelectEnum";
import { PaidType } from "../../constants/enums";
import useNumberEnumSearchParam from "../../hooks/useNumberEnumSearchParam";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
type Props = SelectProps;
const PaidTypeFilter: FC<Props> = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paidType = useNumberEnumSearchParam<PaidType>("paidType") ?? "";
  const handleRecordChange = (e: SelectChangeEvent<any>) => {
    searchParams.set("paidType", e.target.value);
    setSearchParams(searchParams);
  };
  const handleClear = () => {
    searchParams.delete("paidType");
    setSearchParams(searchParams);
  };
  return (
    <SelectEnum
      _enum={PaidType}
      onClear={handleClear}
      value={paidType}
      onChange={handleRecordChange}
      size="small"
      translationPrefix={"PaidType"}
      {...props}
    />
  );
};
export default PaidTypeFilter;
