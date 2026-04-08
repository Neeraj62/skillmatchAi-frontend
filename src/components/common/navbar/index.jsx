import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { useTheme } from "../../../context/theme";
import { candidateService, recruiterService } from "../../../services";
import { HiOutlineSun, HiOutlineMoon, HiOutlineSearch, HiOutlineBell, HiOutlineUserCircle } from "react-icons/hi";
import styles from "./styles.module.scss";

const CommonNavbar = () => {
  const { user, setUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const profileImage = user?.avatarUrl;
  const userInitials = user?.name?.split(" ").map(n => n[0]).join("") || "U";

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?._id && !user.avatarUrl) {
        try {
          const res = user.role === 'recruiter' 
            ? await recruiterService.getProfile(user._id)
            : await candidateService.getProfile(user._id);
          
          const avatar = user.role === 'recruiter' ? res.data?.companyLogoUrl : res.data?.avatarUrl;
          if (avatar) {
            const updatedUser = { ...user, avatarUrl: avatar };
            setUser(updatedUser);
            localStorage.setItem("auth_user", JSON.stringify(updatedUser));
          }
        } catch (err) {
          console.error("Navbar profile fetch error:", err);
        }
      }
    };
    fetchProfile();
  }, [user?._id, user?.avatarUrl, setUser]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/jobs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <nav className={`${styles.navbar} ${open ? styles["is-open"] : ""}`}>
        <div className={styles.navbar__left}>
          <div className={styles.navbar__brand}>
            <Link to="/">SkillMatch AI</Link>
          </div>
          
          {user && (
            <form className={styles.searchBar} onSubmit={handleSearch}>
              <HiOutlineSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder={user.role === "recruiter" ? "Search candidates..." : "Search for jobs..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          )}
        </div>

        <div className={styles.navbar__cta}>
          <button 
            className={styles.iconBtn} 
            onClick={toggleTheme} 
            title="Toggle Theme"
          >
            {theme === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
          </button>
          
          {user && (
            <>
              <button className={styles.iconBtn} title="Notifications">
                <HiOutlineBell />
                <span className={styles.notificationBadge}></span>
              </button>
              
              <div className={styles.userProfile}>
                <div className={styles.profileAvatar}>
                  {profileImage ? (
                    <img src={profileImage} alt={user.name} />
                  ) : (
                    <span>{userInitials}</span>
                  )}
                </div>
                <span className={styles.userName}>{user.name}</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default CommonNavbar;
