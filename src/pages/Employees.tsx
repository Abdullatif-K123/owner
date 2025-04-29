import { pageTitle } from "@/utils/pageTitle";
import EmployeesPage from "@/features/employees";

const Employees = () => {
  pageTitle("الموظفين");
  return <EmployeesPage />;
};

export default Employees;
