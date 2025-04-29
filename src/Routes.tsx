import { lazy, Suspense } from "react";
import {
  // Link,
  Outlet,
  Route,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
  useRouteError,
} from "react-router-dom";
import NotAuthenticatedRoute from "./components/routes/NotAuthenticatedRoute";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";
import NotFound from "./components/feedback/NotFound";
import ClientError from "./components/feedback/ClientError";
import UpdateApp from "./components/feedback/UpdateApp";
import NoPermission from "./components/feedback/NoPermission";
import { TopBarProgress } from "@/components/feedback/TopBarProgress";

import AuthLayout from "./features/AuthLayout";
import Layout from "@/features/Layout";

const Login = lazy(() => import("./pages/Login"));
const EmployeeLogin = lazy(() => import("./pages/EmployeeLogin"));
const Signup = lazy(() => import("./pages/SignUp"));

const Home = lazy(() => import("./pages/Home"));
const Branches = lazy(() => import("./pages/Branches"));
const Busses = lazy(() => import("./pages/Busses"));
const Tours = lazy(() => import("./pages/Tours"));
const VirtualTours = lazy(() => import("./pages/VirtualTours"));

const GeneralBoxes = lazy(() => import("./pages/GeneralBoxes"));
const Accounting = lazy(() => import("./pages/Accounting"));
const CompanyAccounting = lazy(() => import("./pages/CompanyAccounting"));
const CompanyAccountingDetails = lazy(
  () => import("./pages/CompanyAccountingDetails")
);
const AccountingBoxes = lazy(() => import("./pages/AccountingBoxes"));
const AccountingDetails = lazy(() => import("./pages/AccountingDetails"));
const AccountingTourDetails = lazy(
  () => import("./pages/AccountingTourDetails")
);

const Employees = lazy(() => import("./pages/Employees"));
const Managers = lazy(() => import("./pages/Managers"));
const Reservations = lazy(() => import("./pages/Reservations"));
const SecurityListExport = lazy(
  () => import("@/features/security-list/SecurityListExport")
);
const SecurityList = lazy(() => import("@/pages/SecurityList"));

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<WithScroll />} errorElement={<ErrorBoundary />}>
      <Route element={<NotAuthenticatedRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/employee" element={<EmployeeLogin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Route>
      <Route element={<AuthenticatedRoute />}>
        <Route path="/" element={<Layout />}>
          {/* <Route
            path="test1"
            element={
              <div>
                <Link to="/test2">test2</Link>
              </div>
            }
          />
          <Route
            path="test2"
            element={
              <div>
                <Link to="/test3">test3 </Link>
                <Link to="/test1">test1 </Link>
              </div>
            }
          />
          <Route
            path="test3"
            element={
              <div>
                <Link to="/branches">branches</Link>
              </div>
            }
          /> */}
          <Route index element={<Home />} />
          <Route path="branches" element={<Branches />} />
          <Route path="busses" element={<Busses />} />
          <Route path="tours" element={<Tours />} />
          <Route path="virtualTours" element={<VirtualTours />} />
          <Route
            path="company-accounting-cash"
            element={<CompanyAccounting />}
          />
          <Route
            path="company-accounting-online"
            element={<CompanyAccounting />}
          />
          <Route
            path="company-accounting/:id"
            element={<CompanyAccountingDetails />}
          />
          <Route path="sandook-general" element={<GeneralBoxes />} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="accounting/:id" element={<AccountingDetails />} />
          <Route path="accounting-details/:id" element={<AccountingBoxes />} />
          <Route
            path="accounting/:id/:staffId"
            element={<AccountingTourDetails />}
          />
          <Route path="employees" element={<Employees />} />
          <Route path="managers" element={<Managers />} />
          <Route path="tours/:id/reservations" element={<Reservations />} />
          <Route path="security-list/:id" element={<SecurityList />} />
        </Route>
        <Route
          path="security-list/:id/export"
          element={
            <Suspense fallback={<TopBarProgress />}>
              <SecurityListExport />
            </Suspense>
          }
        />
        <Route path="403" element={<NoPermission />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);

export default routes;

function ErrorBoundary() {
  const error = useRouteError() as any;
  console.log(error);
  if (
    error instanceof Error &&
    (error.message.includes("Failed to fetch dynamically imported module") ||
      error.message.includes("Importing a module script failed"))
  ) {
    return <UpdateApp />;
  }
  return (
    <ClientError
      message={error.toString()}
      retry={() => window.location.reload()}
    />
  );
}

function WithScroll() {
  return (
    <>
      <Outlet />
      <ScrollRestoration
        getKey={({ pathname }) => {
          return pathname;
        }}
      />
    </>
  );
}
