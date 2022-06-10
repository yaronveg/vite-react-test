import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" end>
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places" end>
          MY PLACES
        </NavLink>
      </li>
      <li>
        <NavLink to="/places/new" end>
          ADD PLACE
        </NavLink>
      </li>
      <li>
        <NavLink to="/auth" end>
          AUTHENTICATE
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
