import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Background Effects */}
      <div className={styles.hero__glow} />
      <div className={styles.hero__grid} />
      
      <div className={styles.hero__container}>
        <div className={styles.hero__content}>
          {/* Badge */}
          <div className={styles.hero__badge}>
            <span className={styles.hero__badgeDot} />
            Trusted by 500+ companies worldwide
          </div>

          {/* Headline */}
          <h1 className={styles.hero__title}>
            AI-Powered Hiring.{" "}
            <span className={styles.hero__titleGradient}>Smarter Matches.</span>{" "}
            Faster Decisions.
          </h1>

          {/* Sub-headline */}
          <p className={styles.hero__subtitle}>
            Transform your recruitment process with intelligent candidate matching. 
            Our AI analyzes skills, experience, and culture fit to connect you with 
            the perfect candidates in minutes, not months.
          </p>

          {/* CTAs */}
          <div className={styles.hero__cta}>
            <Link to="/signup" className={styles.hero__btnPrimary}>
              Get Started Free
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/login" className={styles.hero__btnSecondary}>
              Post a Job
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.hero__stats}>
            <div className={styles.hero__stat}>
              <span className={styles.hero__statValue}>10M+</span>
              <span className={styles.hero__statLabel}>Candidates</span>
            </div>
            <div className={styles.hero__statDivider} />
            <div className={styles.hero__stat}>
              <span className={styles.hero__statValue}>92%</span>
              <span className={styles.hero__statLabel}>Match Accuracy</span>
            </div>
            <div className={styles.hero__statDivider} />
            <div className={styles.hero__stat}>
              <span className={styles.hero__statValue}>3x</span>
              <span className={styles.hero__statLabel}>Faster Hiring</span>
            </div>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className={styles.hero__visual}>
          <div className={styles.hero__card}>
            <div className={styles.hero__cardHeader}>
              <div className={styles.hero__cardDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>AI Matching Engine</span>
            </div>
            <div className={styles.hero__cardContent}>
              <div className={styles.hero__matchItem}>
                <div className={styles.hero__matchAvatar}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill="currentColor" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor" />
                  </svg>
                </div>
                <div className={styles.hero__matchInfo}>
                  <span className={styles.hero__matchName}>Neeraj Kumar</span>
                  <span className={styles.hero__matchRole}>Full-Stack Dev</span>
                </div>
                <div className={styles.hero__matchScore}>
                  <span>92%</span>
                  match
                </div>
              </div>
              <div className={styles.hero__matchItem}>
                <div className={styles.hero__matchAvatar}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill="currentColor" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor" />
                  </svg>
                </div>
                <div className={styles.hero__matchInfo}>
                  <span className={styles.hero__matchName}>Jai Kumar</span>
                  <span className={styles.hero__matchRole}>Frontend Dev</span>
                </div>
                <div className={styles.hero__matchScore}>
                  <span>84%</span>
                  match
                </div>
              </div>
              <div className={styles.hero__matchItem}>
                <div className={styles.hero__matchAvatar}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill="currentColor" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="currentColor" />
                  </svg>
                </div>
                <div className={styles.hero__matchInfo}>
                  <span className={styles.hero__matchName}>Sumit</span>
                  <span className={styles.hero__matchRole}>Backend Dev</span>
                </div>
                <div className={styles.hero__matchScore}>
                  <span>80%</span>
                  match
                </div>
              </div>
              <div className={styles.hero__analyzing}>
                <div className={styles.hero__analyzingBar}>
                  <div className={styles.hero__analyzingProgress} />
                </div>
                <span>AI analyzing 2,847 more candidates...</span>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className={`${styles.hero__float} ${styles.hero__float1}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            Skills Matched
          </div>
          <div className={`${styles.hero__float} ${styles.hero__float2}`}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22,4 12,14.01 9,11.01" />
            </svg>
            Verified
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default Hero;
