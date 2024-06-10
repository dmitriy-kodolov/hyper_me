import { NavLink } from "react-router-dom";
import cn from "classnames";
import s from "./NavBar.module.scss";

const navBarItems = [
  { title: "SEND MESSAGE", path: "/" },
  // { title: "hFT BRIDGE", path: "/hFT" },
  { title: "hNFT BRIDGE", path: "/hNFT" },
];
const NavBar = () => (
  <nav className={s.root}>
    {navBarItems.map(({ path, title }) => (
      <NavLink
        to={path}
        className={({ isActive }) => cn(s.navBarItem, { [s.active]: isActive })}
        type="button"
        key={title}
      >
        {title}
      </NavLink>
    ))}
  </nav>
);

export default NavBar;
