import React from "react";
import CommonNavbar from "../../components/common/navbar";
import CommonSidebar from "../../components/common/sidebar";
import styles from "./styles.module.scss";
import { Outlet } from "react-router-dom";

const RecruiterDashboard = () => {
  return (
    <div className={styles.wrapper}>
      <CommonNavbar />
      <div className={styles.content}>
        <CommonSidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
