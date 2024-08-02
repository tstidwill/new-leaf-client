import "./Header.scss";
import { NavLink } from "react-router-dom";
import greenLogo from "../../assets/logos/greenlogo.png";

export default function Header() {
  return (
    <div className="landingpage__header header">
      <div className="header__content">
        <img
          src={greenLogo}
          className="header__logo logo"
          alt="leaf logo"
        ></img>
        <ul className="header__nav">
          <NavLink to="/" className="header__navlink">
            home
          </NavLink>
          <NavLink to="/discover" className="header__navlink">
            discover
          </NavLink>
          <NavLink to="/events" className="header__navlink">
            events
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
