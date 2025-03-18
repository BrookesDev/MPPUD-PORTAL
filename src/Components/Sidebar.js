import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Sidebar.module.css";
import Logo from ".././Asset/mWR 2.svg";
import Home from ".././Asset/House.svg";
 
function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={Logo} alt="logo" />
      </div>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={Home} alt="home" className="sidebar-icon" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/request"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Request
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/budget-performance"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Budget Performance
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile-settings"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Profile Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
