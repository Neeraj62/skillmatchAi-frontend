import React from "react";
import { useAuth } from "../context/auth";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>{user ? user.name : ""}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
