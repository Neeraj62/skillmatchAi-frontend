import React from "react";
import styles from "./styles.module.scss";

const features = [
  {
    id: 1,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15h6" />
        <path d="M9 11h6" />
        <circle cx="12" cy="18" r="1" />
      </svg>
    ),
    title: "AI Resume Analysis",
    description: "Our advanced AI scans and extracts key information from resumes in seconds, identifying skills, experience, and qualifications with remarkable accuracy."
  },
  {
    id: 2,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Smart Skill Matching",
    description: "Intelligent algorithms match candidate skills to job requirements, ensuring the perfect fit between talent and opportunity every time."
  },
  {
    id: 3,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Automated Shortlisting",
    description: "Automatically filter and shortlist candidates based on customizable criteria, saving hours of manual screening work."
  },
  {
    id: 4,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
    title: "Candidate Ranking",
    description: "Get intelligent rankings of candidates with detailed match scores, helping you prioritize the best talent for every position."
  },
  {
    id: 5,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Recruiter Dashboard",
    description: "A powerful, intuitive dashboard that gives recruiters complete visibility over the hiring pipeline and candidate progress."
  },
  {
    id: 6,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
    title: "Data-Driven Insights",
    description: "Make informed decisions with comprehensive analytics and reports on your hiring process, candidate quality, and recruitment metrics."
  }
];

const Feature = () => {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Features</span>
          <h2 className={styles.title}>
            Everything You Need to
            <span className={styles.gradient}> Hire Smarter</span>
          </h2>
          <p className={styles.subtitle}>
            Powerful AI-driven tools designed to streamline your hiring process and find the perfect candidates faster than ever before.
          </p>
        </div>

        {/* Feature Grid */}
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.iconWrapper}>
                <div className={styles.icon}>
                  {feature.icon}
                </div>
                <div className={styles.iconGlow} />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
              <div className={styles.cardArrow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.cta}>
          <p className={styles.ctaText}>Ready to transform your hiring process?</p>
          <a href="/signup" className={styles.ctaButton}>
            Start Free Trial
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Feature;
