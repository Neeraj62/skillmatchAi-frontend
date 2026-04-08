import React from "react";
import styles from "./styles.module.scss";

const About = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        {/* Text Column */}
        <div className={styles.textColumn}>
          <span className={styles.badge}>About SkillMatch AI</span>
          <h2 className={styles.title}>
            Transforming Recruitment with{" "}
            <span className={styles.gradient}>Intelligent Matching</span>
          </h2>
          
          <p className={styles.mission}>
            Our mission is to revolutionize hiring by connecting the right talent 
            with the right opportunities through the power of artificial intelligence.
          </p>
          
          <p className={styles.description}>
            Traditional hiring is broken. Endless resume screening, missed talent, 
            and bias-prone processes cost companies millions. SkillMatch AI changes 
            everything by analyzing skills, experience, and cultural fit in seconds 
            — not weeks.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h4>Bias-Free Hiring</h4>
                <p>Our AI evaluates candidates purely on skills and qualifications</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h4>Save 40+ Hours</h4>
                <p>Reduce time-to-hire from weeks to days with smart automation</p>
              </div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className={styles.featureContent}>
                <h4>Better Culture Fit</h4>
                <p>Match candidates who align with your company values and culture</p>
              </div>
            </div>
          </div>
        </div>

        {/* Illustration Column */}
        <div className={styles.illustrationColumn}>
          <div className={styles.illustrationWrapper}>
            {/* Background glow */}
            <div className={styles.glow}></div>
            
            {/* Main illustration card */}
            <div className={styles.illustrationCard}>
              {/* AI Brain visualization */}
              <div className={styles.aiVisual}>
                <div className={styles.brainContainer}>
                  <svg className={styles.brainSvg} viewBox="0 0 200 200" fill="none">
                    {/* Neural network nodes */}
                    <circle cx="100" cy="50" r="8" className={styles.node} />
                    <circle cx="50" cy="80" r="6" className={styles.node} />
                    <circle cx="150" cy="80" r="6" className={styles.node} />
                    <circle cx="70" cy="120" r="7" className={styles.node} />
                    <circle cx="130" cy="120" r="7" className={styles.node} />
                    <circle cx="100" cy="150" r="8" className={styles.node} />
                    <circle cx="40" cy="140" r="5" className={styles.node} />
                    <circle cx="160" cy="140" r="5" className={styles.node} />
                    
                    {/* Connections */}
                    <line x1="100" y1="50" x2="50" y2="80" className={styles.connection} />
                    <line x1="100" y1="50" x2="150" y2="80" className={styles.connection} />
                    <line x1="50" y1="80" x2="70" y2="120" className={styles.connection} />
                    <line x1="150" y1="80" x2="130" y2="120" className={styles.connection} />
                    <line x1="70" y1="120" x2="100" y2="150" className={styles.connection} />
                    <line x1="130" y1="120" x2="100" y2="150" className={styles.connection} />
                    <line x1="70" y1="120" x2="40" y2="140" className={styles.connection} />
                    <line x1="130" y1="120" x2="160" y2="140" className={styles.connection} />
                    <line x1="50" y1="80" x2="150" y2="80" className={styles.connection} />
                    <line x1="70" y1="120" x2="130" y2="120" className={styles.connection} />
                  </svg>
                  
                  {/* Pulsing center */}
                  <div className={styles.pulseCenter}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating data cards */}
              <div className={`${styles.dataCard} ${styles.dataCard1}`}>
                <div className={styles.dataCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <polyline points="17 11 19 13 23 9" />
                  </svg>
                </div>
                <span>Skills Matched</span>
              </div>

              <div className={`${styles.dataCard} ${styles.dataCard2}`}>
                <div className={styles.dataCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <span>98% Accuracy</span>
              </div>

              <div className={`${styles.dataCard} ${styles.dataCard3}`}>
                <div className={styles.dataCardIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <span>Top Talent</span>
              </div>
            </div>

            {/* Orbiting elements */}
            <div className={styles.orbit}>
              <div className={styles.orbitDot}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
