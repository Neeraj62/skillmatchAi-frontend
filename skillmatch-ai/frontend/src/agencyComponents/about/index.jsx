import React from "react";
import styles from "./styles.module.scss";

const AgencyAbout = () => {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <div className={styles.visual}>
          <div className={styles.experienceCard}>
            <div className={styles.glow} />
            <span className={styles.number}>2+</span>
            <span className={styles.text}>years of experience</span>
          </div>
        </div>
        
        <div className={styles.content}>
          <span className={styles.tag}>About Me</span>
          <h2 className={styles.title}>
            Designing delightful user experiences that truly work
          </h2>
          <p className={styles.description}>
            I'm a UI/UX designer focused on crafting clean, user-centric designs for web and mobile apps. 
            With a passion for usability and aesthetics, I help brands build intuitive and engaging digital products.
          </p>
          
          <ul className={styles.features}>
            <li>
              <span className={styles.check}>✓</span>
              Expert in user-friendly
            </li>
            <li>
              <span className={styles.check}>✓</span>
              wireframing
            </li>
            <li>
              <span className={styles.check}>✓</span>
              Collaborative
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AgencyAbout;
