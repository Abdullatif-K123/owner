import { Stack } from "@mui/material";
import Filters from "@/features/accountingDetails/Filters";
import AccountingDetailsTable from "@/features/accountingDetails/Table";

const AccountingDetailsPage = () => {
  return (
    <Stack spacing={2}>
      <Filters />
      <AccountingDetailsTable />
    </Stack>
  );
};

export default AccountingDetailsPage;
