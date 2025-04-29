import { Grid } from "@mui/material";
import FilterRow from "../../components/layout/FilterRow";
import SearchInput from "../../components/inputs/SearchInput";
import BranchFilterAutocomplete from "../../components/filters/BranchFilterAutocomplete";

const Filters = () => {
  return (
    <FilterRow sx={{ mb: 3 }}>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <BranchFilterAutocomplete label="الفرع" />
      </Grid>
    </FilterRow>
  );
};

export default Filters;
