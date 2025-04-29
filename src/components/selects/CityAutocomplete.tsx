import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { ReactNode } from "react";
// import cityQueries from "../../API/city/queries";
import { queries } from "../../API/auth/queries";
import Loading from "../feedback/Loading";
type Props = {
  countryId: string | null;
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode;
} & Omit<
  AutocompleteProps<{ name: string; id: string }, false, false, false>,
  "options" | "renderInput"
>;
const CityAutocomplete = ({ countryId, ...props }: Props) => {
  const { data, isLoading } = queries.useCity();

  return (
    <Autocomplete
      key={countryId}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      {...props}
      loading={isLoading}
      options={data ?? []}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          {option.name}
        </li>
      )}
      renderInput={props.renderInput ?? (() => null)}
      loadingText={<Loading />}
      noOptionsText="لا يوجد"
    />
  );
};
export default CityAutocomplete;
