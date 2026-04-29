import React from "react";
import styles from "./styles.module.scss";

// Using a high-quality pointing man PNG that is reliable
const professionalManImg = "https://www.pngmart.com/files/15/Professional-Man-Pointing-Finger-PNG.png";

const AgencyHero = () => {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.hero__glowLeft} />
      <div className={styles.hero__glowRight} />
      
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          <div className={styles.hero__tag}>Top Rated Developer</div>
          <h1 className={styles.hero__title}>
            Crafting User-Centric <br /> <span className={styles.highlight}>UI Designs</span>
          </h1>
          <p className={styles.hero__subtitle}>
            I'm Satyam, a UI/UX designer transforming ideas into functional, aesthetic 
            digital experiences for web and mobile.
          </p>
          
          <div className={styles.hero__actions}>
            <a href="#services" className={styles.btnYellow}>Our Work</a>
          </div>

          <div className={styles.hero__socialProof}>
            <div className={styles.avatars}>
              <div className={styles.avatar}>👤</div>
              <div className={styles.avatar}>👤</div>
              <div className={styles.avatar}>👤</div>
            </div>
            <span>120+ Satisfied Clients</span>
          </div>
        </div>

        <div className={styles.hero__visual}>
          <div className={styles.hero__imageWrapper}>
            <div className={styles.hero__imageBg} />
            
            {/* Dotted Paths from Image */}
            <svg className={styles.dottedPaths} width="500" height="600" viewBox="0 0 500 600" fill="none">
              <path d="M50 100C70 150 100 180 150 200" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M450 150C400 180 380 220 350 280" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            <img src={professionalManImg} alt="Satyam Kumar" className={styles.hero__profileImage} />
            
            {/* Paper Planes from Image */}
            <div className={`${styles.paperPlane} ${styles.planePurple}`}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={`${styles.paperPlane} ${styles.planePink}`}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Floating Badges */}
            <div className={`${styles.floatingCard} ${styles.card1}`}>
              <div className={styles.cardIcon}>✓</div>
              <div className={styles.cardText}>
                <span>UI Audit</span>
                <div className={styles.avatarRow}>
                   <div className={styles.miniAvatar}>👤</div>
                   <div className={styles.miniAvatar}>👤</div>
                </div>
                <strong>Monthly $100</strong>
              </div>
            </div>
            
            <div className={`${styles.floatingCard} ${styles.card2}`}>
              <div className={styles.cardIcon}>💎</div>
              <div className={styles.cardText}>
                <span>Premium rate</span>
                <strong>$72.5 / Month</strong>
              </div>
            </div>

            <div className={`${styles.floatingCard} ${styles.card3}`}>
              <div className={styles.cardIcon}>%</div>
              <div className={styles.cardText}>
                <span>Get Discount</span>
                <strong>18% / First Pay</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyHero;
