import FilterRow from "../../components/layout/FilterRow";
import { Grid } from "@mui/material";
import SearchInput from "../../components/inputs/SearchInput";
import BranchFilterAutocomplete from "../../components/filters/BranchFilterAutocomplete";
import BooleanSelect from "@/components/filters/BooleanSelect";
import DateFilter2 from "@/components/filters/DateFilter2";

const CompanyAccountingFilter = () => {
  return (
    <FilterRow sx={{ justifyContent: "center", widdth: "100%" }}>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <SearchInput />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <BranchFilterAutocomplete label="الفرع" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <DateFilter2 label="من" paramName="from" small />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <DateFilter2 label="إلى" paramName="to" small />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <BooleanSelect name="isCompanyConfirm" label="تأكيد الشركة" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={2}>
        <BooleanSelect name="isOwnerConfirm" label="تأكيد المالك" />
      </Grid>
    </FilterRow>
  );
};

export default CompanyAccountingFilter;
