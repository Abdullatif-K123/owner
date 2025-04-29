import { Grid } from "@mui/material";
import SearchInput from "../../components/inputs/SearchInput";
import CityFilterAutocomplete from "../../components/filters/CityFilterAutocomplete";
import FilterRow from "../../components/layout/FilterRow";

const BranchFilter = () => {
  return (
    <FilterRow>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <CityFilterAutocomplete label="المدينة" />
      </Grid>
    </FilterRow>
  );
};
export default BranchFilter;
