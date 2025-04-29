import FilterRow from "../../../components/layout/FilterRow";
import { Grid } from "@mui/material";
import BranchFilterAutocomplete from "../../../components/filters/BranchFilterAutocomplete";
import ToursFilter from "../components/ToursFilter";

const Filter = () => {
  return (
    <FilterRow sx={{ alignItems: "center" }}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <BranchFilterAutocomplete label="الفرع" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ToursFilter />
      </Grid>
    </FilterRow>
  );
};

export default Filter;
