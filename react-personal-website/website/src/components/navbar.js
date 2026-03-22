import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { PATH_WEBPAGE } from "../routes/paths";

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ExperienceIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const Navbar = () => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (location.pathname.includes(PATH_WEBPAGE.general.experience)) {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  }, [location.pathname]);

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.navbar}>
        <div 
          className={styles.indicator} 
          style={{ transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * 4}px))` }} 
        />

        <Link
          to={PATH_WEBPAGE.general.home}
          className={`${styles.navItem} ${activeIndex === 0 ? styles.active : ""}`}
          title="Home"
          aria-label="Home"
        >
          <HomeIcon />
        </Link>

        <Link
          to={PATH_WEBPAGE.general.experience}
          className={`${styles.navItem} ${activeIndex === 1 ? styles.active : ""}`}
          title="Experience"
          aria-label="Experience"
        >
          <ExperienceIcon />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;