import { useSearchParams } from "react-router-dom";
import DatePickerComp from "@/components/inputs/DatePickerComp";
import { isoToDate } from "@/utils/transforms";

type Props = {
  label: string;
  initial?: string;
  initialNow?: boolean;
  paramName?: string;
  small?: boolean;
  clearable?: boolean;
};

export const DateFilter2 = ({
  label,
  initial,
  initialNow,
  small,
  clearable = true,
  paramName = "date",
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get(paramName);

  const handleChange = (value: string) => {
    setSearchParams((searchParams) => {
      if (value) searchParams.set(paramName, value);
      else searchParams.delete(paramName);
      return searchParams;
    });
  };

  const dateVal = isoToDate(date);

  const initialVal = initial
    ? new Date(initial).toString()
    : initialNow
    ? new Date().toString()
    : undefined;
  const defaultValue = initial
    ? new Date(initial)
    : initialNow
    ? new Date()
    : null;
  return (
    <DatePickerComp
      clearable={initialNow ? false : clearable}
      small={small}
      label={label}
      defaultValue={defaultValue}
      value={dateVal ? dateVal.toString() : initialVal}
      onChange={handleChange}
    />
  );
};
export default DateFilter2;
