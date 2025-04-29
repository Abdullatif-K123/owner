import BranchFilterAutocomplete from "@/components/filters/BranchFilterAutocomplete";
// import DateFilter2 from "@/components/filters/DateFilter2";
import StaffFilterAutocomplete from "@/components/filters/StaffFilterAutocomplete";
import SearchInput from "@/components/inputs/SearchInput";
import FilterRow from "@/components/layout/FilterRow";
import { useRoleContext } from "@/contexts/RoleContext";
import { Grid } from "@mui/material";

const AccountignFilters = () => {
  const { isManager, isOwner } = useRoleContext();
  return (
    <FilterRow sx={{ width: "100%" }}>
      <Grid item xs={12} sm={12} md={3} lg={2}>
        <SearchInput />
      </Grid>
      {/* <Grid item xs={12} sm={12} md={3} lg={2}>
        <DateFilter2 initialNow paramName="from" label="من" small />
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={2}>
        <DateFilter2 initialNow paramName="to" label="إلى" small />
      </Grid> */}
      {isOwner && (
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <BranchFilterAutocomplete label="الفرع" />
        </Grid>
      )}
      {(isManager || isOwner) && (
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <StaffFilterAutocomplete />
        </Grid>
      )}
    </FilterRow>
  );
};

export default AccountignFilters;
