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
import ManageStore from "../pages/manage-store";

const listRoute: Route[] = [
  {
    path: routePath.home,
    component: <Home />,
    layout: MainLayout,
  },
  {
    path: routePath.login,
    component: <Login />,
    layout: AuthLayout,
  },
  {
    path: routePath.signup,
    component: <SignUp />,
    layout: AuthLayout,
  },
  {
    path: routePath.order,
    component: <Order />,
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
];

export default listRoute;
