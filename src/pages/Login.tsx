import LoginPage from "@/features/login/Login";
import { pageTitle } from "@/utils/pageTitle";

const Login = () => {
  pageTitle("تسجيل الدخول");
  return <LoginPage />;
};

export default Login;
