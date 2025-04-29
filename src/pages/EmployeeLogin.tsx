import EmployeeLoginPage from "@/features/login/EmployeeLogin";
import { pageTitle } from "@/utils/pageTitle";

const EmployeeLogin = () => {
  pageTitle("تسجيل دخول كموظف");
  return <EmployeeLoginPage />;
};

export default EmployeeLogin;
