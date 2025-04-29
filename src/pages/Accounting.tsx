import { Stack } from "@mui/material";
import { useState } from "react";

import AccountignFilters from "@/features/accounting/Filters";
import AccountingModal from "@/features/accounting/Modal";
import AccountingTable from "@/features/accounting/Table";
import { pageTitle } from "@/utils/pageTitle";
import AccountingAnalytics from "@/features/accounting/analytics";
import RecieveAmount from "@/features/accounting/RecieveAmount";
import AccountingProvider from "@/features/accounting/context/AccountingProvider";
import { useRoleContext } from "@/contexts/RoleContext";
import useAccountingPageParams from "@/features/accounting/usePageParams";
import NoStaffSelectedAnalytics from "@/features/accounting/analytics/NoStaffSelected";
import NoStaffSelected from "@/features/accounting/Table/NoStaffSelected";

const Accounting = () => {
  pageTitle("الصناديق");

  const [openModal, setOpenModal] = useState(false);
  const { isStaff } = useRoleContext();
  const { userId } = useAccountingPageParams();
  return (
    <AccountingProvider>
      <Stack spacing={2}>
        <AccountignFilters />

        {(isStaff || userId) && <AccountingAnalytics />}
        {!isStaff && !userId && <NoStaffSelectedAnalytics />}
        <RecieveAmount />
        {(isStaff || userId) && <AccountingTable />}
        {!isStaff && !userId && <NoStaffSelected />}
        <AccountingModal onClose={() => setOpenModal(false)} open={openModal} />
      </Stack>
    </AccountingProvider>
  );
};

export default Accounting;
