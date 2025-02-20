import { createBrowserRouter } from "react-router-dom";
import Order from "../pages/order";
import Login from "../pages/auth/login";
import Home from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
