import { Navigate } from "react-router-dom";
import { Stack } from "@mui/material";

import { useRoleContext } from "@/contexts/RoleContext";
import CompanyAccountingFilter from "@/features/company-accounting/Filter";
import CompanyAccountingTable from "@/features/company-accounting/Table";
import ConfirmDialog from "@/features/company-accounting/ConfirmDialog";
import { pageTitle } from "@/utils/pageTitle";
import CompanyAccountingProvider from "@/features/company-accounting/context/CompanyAccountingProvider";
import SelectToursButton from "@/features/company-accounting/SelectToursButton";

const CompanyAccounting = () => {
  pageTitle("المالية");

  const { isOwner } = useRoleContext();
  if (!isOwner) return <Navigate to="/" />;

  return (
    <CompanyAccountingProvider>
      <Stack spacing={2}>
        <CompanyAccountingFilter />
        <SelectToursButton />
        <CompanyAccountingTable />
        <ConfirmDialog />
      </Stack>
    </CompanyAccountingProvider>
  );
};

export default CompanyAccounting;
