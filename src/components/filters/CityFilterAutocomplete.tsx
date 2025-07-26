import usePrevious from "../../hooks/usePrevious";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CitySelect } from "../../API/branches/type";
import { CountrySelect } from "../../API/branches/type";
import useObjectSearchParam from "../../hooks/useObjectSearchParam";
import TextField from "../inputs/TextField";
import CityAutocomplete from "../selects/CityAutocomplete";
type Props = {
  label: string;
};
const CityFilterAutocomplete: FC<Props> = ({ label }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const countryId = useObjectSearchParam<CountrySelect>("country")?.id ?? null;

  const prevCountryId = usePrevious(countryId);
  const city = useObjectSearchParam<CitySelect>("city");

  const handleChange = (city: CitySelect | null) => {
    if (city) {
      searchParams.set("city", JSON.stringify(city));
    } else {
      searchParams.delete("city");
    }
    setSearchParams(searchParams);
  };
  useEffect(() => {
    if (countryId !== prevCountryId && prevCountryId !== undefined) {
      setSearchParams((searchParams) => {
        searchParams.delete("city");
        return searchParams;
      });
    }
  }, [countryId, prevCountryId, setSearchParams]);
  return (
    <CityAutocomplete
      countryId={countryId}
      value={city}
      size="small"
      onChange={(_, value) => handleChange(value)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};
export default CityFilterAutocomplete;
