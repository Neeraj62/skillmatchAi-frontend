import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const AgencyNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoName}>SkillMatch</span>
          <span className={styles.logoTitle}>Digital Agency</span>
        </div>
        
        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.active : ""}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#contact" className={styles.ctaBtn}>Contact Me <span className={styles.arrow}>→</span></a></li>
        </ul>
        
        <div 
          className={styles.hamburger} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className={`${styles.bar} ${isMenuOpen ? styles.bar1 : ""}`} />
          <div className={`${styles.bar} ${isMenuOpen ? styles.bar2 : ""}`} />
          <div className={`${styles.bar} ${isMenuOpen ? styles.bar3 : ""}`} />
        </div>
      </div>
    </nav>
  );
};

export default AgencyNavbar;
