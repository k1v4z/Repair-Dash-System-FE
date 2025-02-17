import { createBrowserRouter } from "react-router-dom";
import Order from "../features/order";
import Login from "../features/auth/components/login";
import Home from "../features/home/components/home";

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
