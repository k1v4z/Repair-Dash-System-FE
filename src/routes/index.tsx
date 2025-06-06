import type { Route } from "../types/routes.type";
import { AuthRoute } from "./auth-route";
import routePath from "../config/route";
import { PrivateRoute } from "./private-route";
import { AdminRoute } from "./admin-route";
import MainLayout from "../layouts/main-layout";
import AuthLayout from "../layouts/auth-layout";
import AdminLayout from "@/layouts/admin-layout";
import CreateOrder from "../pages/order/creation";
import Login from "../pages/auth/login";
import Home from "../pages/home";
import SignUp from "../pages/auth/signup";
import StorePage from "../pages/store/list";
import StoreDetail from "../pages/store/detail";
import ServiceDetail from "../pages/service/service-detail";
import ManageStore from "../pages/store/manage";
import NotFound from "../pages/not-found";
import OrderTracking from "../pages/order/tracking";
import Profile from "../pages/user";
import ServiceSearchPage from "../pages/service/search";
import ServiceFavorite from "../pages/service/service-favorite";
import OrderManagement from "../pages/order/manage";
import ManageReport from "@/pages/admin/manage-report";
import ManageUser from "@/pages/admin/manage-user";
import Unauthorized from "@/pages/admin/unauthorized";
import Subscription from "@/pages/subscription/list-plan";
import PaymentResult from "@/pages/subscription/payment-result";
import ResetPassword from "@/pages/auth/reset-password/_components";
import { StoreRoute } from "./store-route";
// Import footer pages
import About from "@/pages/about";
import FAQ from "@/pages/faq";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";

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
    path: routePath.bookingService,
    component: (
      <PrivateRoute>
        <CreateOrder />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: routePath.bookingDetail,
    component: (
      <PrivateRoute>
        <OrderTracking />
      </PrivateRoute>
    ),
    layout: MainLayout,
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
    component: (
      <PrivateRoute>
        <ManageStore />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: routePath.serviceDetail,
    component: <ServiceDetail />,
    layout: MainLayout,
  },
  {
    path: routePath.searchService,
    component: <ServiceSearchPage />,
    layout: MainLayout,
  },
  {
    path: "*",
    component: <NotFound />,
    layout: MainLayout,
  },
  {
    path: routePath.profile,
    component: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: routePath.serviceFavorite,
    component: (
      <PrivateRoute>
        <ServiceFavorite />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: routePath.orderManagement,
    component: (
      <PrivateRoute>
        <OrderManagement />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: routePath.manageReport,
    component: (
      <AdminRoute>
        <ManageReport />
      </AdminRoute>
    ),
    layout: AdminLayout,
  },
  {
    path: routePath.manageUser,
    component: (
      <AdminRoute>
        <ManageUser />
      </AdminRoute>
    ),
    layout: AdminLayout,
  },
  {
    path: routePath.unauthorized,
    component: <Unauthorized />,
    layout: null,
  },
  {
    path: routePath.subscription,
    component: (
      <StoreRoute>
        <Subscription />
      </StoreRoute>
    ),
    layout: MainLayout,
  },
  {
    path: routePath.paymentResult,
    component: (
      <PrivateRoute>
        <PaymentResult />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: routePath.resetPassword,
    component:(
      <AuthRoute>
        <ResetPassword/>,
      </AuthRoute>
    ), 
    layout: AuthLayout,
  },
  // Footer routes
  {
    path: routePath.about,
    component: <About />,
    layout: MainLayout,
  },
  {
    path: routePath.faq,
    component: <FAQ />,
    layout: MainLayout,
  },
  {
    path: routePath.terms,
    component: <Terms />,
    layout: MainLayout,
  },
  {
    path: routePath.privacy,
    component: <Privacy />,
    layout: MainLayout,
  },
];

export default listRoute;
