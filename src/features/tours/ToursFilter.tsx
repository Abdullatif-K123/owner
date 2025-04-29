import { Grid } from "@mui/material";
import SearchInput from "../../components/inputs/SearchInput";
import BranchFilterAutocomplete from "../../components/filters/BranchFilterAutocomplete";
import FilterRow from "../../components/layout/FilterRow";
import TourStatusFilter from "../../components/filters/TourStatusFilter";
import DateFilter2 from "@/components/filters/DateFilter2";

const ToursFilter = () => {
  return (
    <FilterRow>
      <Grid item xs={12} sm={12} md={4} lg={3}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <BranchFilterAutocomplete label="الفرع" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <TourStatusFilter label="الحالة" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <DateFilter2 label="من" paramName="from" small />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <DateFilter2 label="إلى" paramName="to" small />
      </Grid>
    </FilterRow>
  );
};
export default ToursFilter;
