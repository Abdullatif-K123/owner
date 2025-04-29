import ManagersTable from "@/features/managers/ManagersTable";
import AddFab from "../../components/buttons/AddFab";
import { useRoleContext } from "../../contexts/RoleContext";
import Filters from "./Filters";
import ManagerActions from "@/features/managers/Actions";
import { Navigate } from "react-router-dom";

const ManagersPage = () => {
  const { isOwner } = useRoleContext();
  if (!isOwner) return <Navigate to="/" />;
  return (
    <>
      <Filters />
      <ManagersTable />
      {isOwner && (
        <>
          <ManagerActions />
          <AddFab />
        </>
      )}
    </>
  );
};

export default ManagersPage;
