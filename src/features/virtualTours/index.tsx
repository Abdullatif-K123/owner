import { Navigate } from "react-router-dom";
import { Stack } from "@mui/material";
import ToursTable from "./Table";
import TourActions from "./Actions";
import AddFab from "@/components/buttons/AddFab";
import { useRoleContext } from "@/contexts/RoleContext";
import VirtualFilters from "./VirtualFilters";

const VirtualToursPage = () => {
  const { isStaff } = useRoleContext();
  if (isStaff) return <Navigate to="/" />;
  return (
    <>
      <Stack sx={{ display: "relative" }} spacing={2}>
        <VirtualFilters />
        <ToursTable />
        <TourActions />
        {!isStaff && <AddFab />}
      </Stack>
    </>
  );
};

export default VirtualToursPage;
