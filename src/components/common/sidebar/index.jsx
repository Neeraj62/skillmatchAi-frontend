import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { USER_SIDEBAR, RECRUITER_SIDEBAR } from "../../../constants/menus";
import styles from "./styles.module.scss";

const CommonSidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const items = user?.role === "recruiter" ? RECRUITER_SIDEBAR : USER_SIDEBAR;

  return (
    <aside className={styles.sidebar}>
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          className={`${styles.item} ${location.pathname === i.to ? styles.active : ""}`}
        >
          {i.label}
        </Link>
      ))}
    </aside>
  );
};

export default CommonSidebar;
