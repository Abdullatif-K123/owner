import { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { lazyImport } from "../../utils/lazyImport";
import RoleProvider from "../../providers/RoleProvider";
const { FirebaseNotification } = lazyImport(
  () => import("../../features/notifications/components/FirebaseNotification"),
  "FirebaseNotification"
);

const AuthenticatedRoute = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return (
      <RoleProvider>
        <Suspense>
          <FirebaseNotification />
        </Suspense>
        <Outlet />
      </RoleProvider>
    );
  }
  const from = encodeURIComponent(window.location.pathname);
  return (
    <Navigate
      to={`/login${
        window.location.pathname !== "/" ? `?redirect=${from}` : ""
      }`}
    />
  );
};
export default AuthenticatedRoute;
