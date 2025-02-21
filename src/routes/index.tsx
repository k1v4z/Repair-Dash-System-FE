import { Route } from "../types/routes.type";
import routePath from "../config/route";

// Layout
import MainLayout from "../layouts/main-layout";
import AdminLayout from "../layouts/admin-layout";

// Page
import Order from "../pages/order";
import Login from "../pages/auth/login";
import Home from "../pages/home";
import Manage from "../pages/manage";

const listRoute: Route[] = [
  { path: routePath.home, component: <Home />, layout: MainLayout },
  { path: routePath.login, component: <Login />, layout: null },
  {
    path: routePath.order,
    component: <Order />,
    layout: MainLayout,
  },
  { path: routePath.manage, component: <Manage />, layout: AdminLayout },
];

export default listRoute;
