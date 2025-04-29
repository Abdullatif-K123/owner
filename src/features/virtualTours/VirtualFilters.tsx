import { Grid } from "@mui/material";
import SearchInput from "../../components/inputs/SearchInput";
import BranchFilterAutocomplete from "../../components/filters/BranchFilterAutocomplete";
import FilterRow from "../../components/layout/FilterRow";

const VirtualFilters = () => {
  return (
    <FilterRow>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <BranchFilterAutocomplete label="الفرع" />
      </Grid>
    </FilterRow>
  );
};
export default VirtualFilters;
