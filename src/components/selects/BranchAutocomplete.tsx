import { Autocomplete, AutocompleteProps } from "@mui/material";
import { FC } from "react";
import { BranchSelect } from "../../API/branches/type";
import Loading from "../feedback/Loading";
import bussesQuery from "../../API/busses/queries";
type Props = Omit<
  AutocompleteProps<BranchSelect, false, false, false>,
  "options"
>;

const BranchAutocomplete: FC<Props> = ({ ...props }) => {
  const { data, isLoading } = bussesQuery.useSelectBranchQuery();

  return (
    <Autocomplete
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
      loadingText={<Loading />}
      noOptionsText="لا يوجد"
    />
  );
};
export default BranchAutocomplete;
