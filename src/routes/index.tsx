import { Route } from "../types/routes.type";
import routePath from "../config/route";
import { PrivateRoute } from "./private-route";
import { PublicRoute } from "./public-route";

import MainLayout from "../layouts/main-layout";
import AdminLayout from "../layouts/admin-layout";
import AuthLayout from "../layouts/auth-layout";

import Order from "../pages/order";
import Login from "../pages/auth/login";
import Home from "../pages/home";
import Manage from "../pages/manage";
import SignUp from "../pages/auth/signup";

const listRoute: Route[] = [
  {
    path: routePath.home,
    component: <Home />,
    layout: MainLayout,
  },
  {
    path: routePath.login,
    component: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    layout: AuthLayout,
    isPublic: true,
  },
  {
    path: routePath.signup,
    component: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
    layout: AuthLayout,
    isPublic: true,
  },
  {
    path: routePath.order,
    component: <Order />,
    layout: MainLayout,
    isProtected: true,
  },
  {
    path: routePath.manage,
    component: (
      <PrivateRoute>
        <Manage />
      </PrivateRoute>
    ),
    layout: AdminLayout,
    isProtected: true,
  },
];

export default listRoute;
