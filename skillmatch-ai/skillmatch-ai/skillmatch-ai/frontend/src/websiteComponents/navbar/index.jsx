import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import styles from "./styles.module.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setOpen(false);
    
    // If not on home page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav className={`${styles.navbar} ${open ? styles["is-open"] : ""} ${scrolled ? styles["is-scrolled"] : ""}`}>
        <Link to="/" className={styles.navbar__brand}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#gradient)" />
            <path d="M10 22L16 10L22 22H10Z" fill="white" fillOpacity="0.9" />
            <circle cx="16" cy="18" r="2" fill="white" />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          <span>SkillMatch AI</span>
        </Link>

        <button 
          className={styles.navbar__toggle} 
          aria-label="Menu" 
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        <div className={styles.navbar__links}>
          <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>About</a>
          <a href="#features" onClick={(e) => handleSmoothScroll(e, "features")}>Features</a>
          <a href="#gallery" onClick={(e) => handleSmoothScroll(e, "gallery")}>Gallery</a>
          <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, "testimonials")}>Testimonials</a>
        </div>

        <div className={styles.navbar__cta}>
          {!user && (
            <>
              <Link to="/login" className={styles.btn}>Sign In</Link>
              <Link to="/signup" className={`${styles.btn} ${styles["btn--primary"]}`}>Get Started</Link>
            </>
          )}
          {user && (
            <button onClick={handleLogout} className={styles.btn}>Sign Out</button>
          )}
        </div>
      </nav>

      <div className={styles.navbar__mobile}>
        <a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>About</a>
        <a href="#features" onClick={(e) => handleSmoothScroll(e, "features")}>Features</a>
        <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, "testimonials")}>Testimonials</a>
        {!user && (
          <>
            <Link to="/login" onClick={() => setOpen(false)} className={styles.btn}>Sign In</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className={`${styles.btn} ${styles["btn--primary"]}`}>Get Started</Link>
          </>
        )}
        {user && (
          <button onClick={() => { handleLogout(); setOpen(false); }} className={styles.btn}>Sign Out</button>
        )}
      </div>
    </>
  );
};

export default Navbar;
