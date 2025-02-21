import { Link } from "react-router-dom";
import routePath from "../../config/route";

const Navbar = () => {
  return (
    <nav>
      <Link to={routePath.home}>Home</Link>
      <Link to={routePath.order}>Order</Link>
    </nav>
  );
};

export default Navbar;
