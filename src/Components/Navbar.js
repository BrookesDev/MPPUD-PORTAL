import React from "react";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <input type="text" placeholder="Search here..." className={styles.search} />
      <div className={styles.actions}>
        <label className={styles.toggleSwitch}>
          <input type="checkbox" />
          <span className={styles.slider}></span>
        </label>
        <div className={styles.profile}>
          <img src="/assets/profile-pic.jpg" alt="User" className={styles.avatar} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
