import { Navigate } from "react-router-dom";

import { useRoleContext } from "@/contexts/RoleContext";
import { Stack } from "@mui/material";
import CompanyAccountingDetailsFilters from "@/features/company-accounting-details/Filters";
import CompanyAccountingDetailsTable from "@/features/company-accounting-details/Table";
import { pageTitle } from "@/utils/pageTitle";

const CompanyAccountingDetails = () => {
  pageTitle("المالية - التفاصيل");

  const { isOwner } = useRoleContext();
  if (!isOwner) return <Navigate to="/" />;
  return (
    <Stack spacing={2}>
      <CompanyAccountingDetailsFilters />
      <CompanyAccountingDetailsTable />
    </Stack>
  );
};

export default CompanyAccountingDetails;
