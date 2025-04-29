import { Autocomplete, AutocompleteProps } from "@mui/material";
import { BranchSelect } from "../../API/branches/type";
import Loading from "../feedback/Loading";
import employeesQuery from "@/API/employees/queries";

type Props = Omit<
  AutocompleteProps<BranchSelect, false, false, false>,
  "options"
> & { branchId: string | null };

const StaffAutocomplete = ({ branchId, ...props }: Props) => {
  const { data, isLoading } = employeesQuery.useSelectQuery(branchId);

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
export default StaffAutocomplete;
