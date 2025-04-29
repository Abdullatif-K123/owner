import { Navigate } from "react-router-dom";
import AddFab from "../../components/buttons/AddFab";
import { useRoleContext } from "../../contexts/RoleContext";
import EmployeeActions from "./EmployeeActions";
import EmployeesTable from "./EmployeesTable";
import Filters from "./Filters";

const EmployeesPage = () => {
  const { isStaff } = useRoleContext();
  if (isStaff) return <Navigate to="/" />;
  return (
    <>
      <Filters />
      <EmployeesTable />
      {!isStaff && (
        <>
          <EmployeeActions />
          <AddFab />
        </>
      )}
    </>
  );
};

export default EmployeesPage;
