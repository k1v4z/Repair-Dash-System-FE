import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constant";

const Navbar = () => {
  return (
    <nav>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.ORDER}>Order</Link>
      <Link to={ROUTES.PROFILE}>Profile</Link>
    </nav>
  );
};

export default Navbar;
