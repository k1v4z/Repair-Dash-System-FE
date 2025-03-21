import { Route } from "../types/routes.type";
import routePath from "../config/route";
import { PrivateRoute } from "./private-route";
import MainLayout from "../layouts/main-layout";
import AdminLayout from "../layouts/admin-layout";
import AuthLayout from "../layouts/auth-layout";
import Order from "../pages/order";
import Login from "../pages/auth/login";
import Home from "../pages/home";
import Manage from "../pages/manage";
import SignUp from "../pages/auth/signup";
import StorePage from "../pages/store/page";
import StoreDetail from "../pages/store-detail";
import ServiceDetail from "../pages/service-detail";
import ManageStore from "../pages/manage-store";
import NotFound from "../pages/not-found";
import { AuthRoute } from "./auth-route";

const listRoute: Route[] = [
  {
    path: routePath.home,
    component: <Home />,
    layout: MainLayout,
  },
  {
    path: routePath.login,
    component: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
    layout: AuthLayout,
  },
  {
    path: routePath.signup,
    component: (
      <AuthRoute>
        <SignUp />
      </AuthRoute>
    ),
    layout: AuthLayout,
  },
  {
    path: routePath.order,
    component: (
      <PrivateRoute>
        <Order />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: routePath.manage,
    component: (
      <PrivateRoute>
        <Manage />
      </PrivateRoute>
    ),
    layout: AdminLayout,
  },
  {
    path: routePath.store,
    component: <StorePage />,
    layout: MainLayout,
  },
  {
    path: routePath.storeDetail,
    component: <StoreDetail />,
    layout: MainLayout,
  },
  {
    path: routePath.manageStore,
    component: <ManageStore />,
    layout: MainLayout,
  },
  {
    path: routePath.serviceDetail,
    component: <ServiceDetail />,
    layout: MainLayout,
  },
  {
    path: "*",
    component: <NotFound />,
    layout: MainLayout,
  },
];

export default listRoute;
