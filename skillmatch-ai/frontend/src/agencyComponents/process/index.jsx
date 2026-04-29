import React from "react";
import styles from "./styles.module.scss";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "We start by understanding your goals, target audience, and project requirements."
  },
  {
    number: "02",
    title: "Design",
    description: "Our designers create intuitive UI/UX prototypes to visualize your project's look and feel."
  },
  {
    number: "03",
    title: "Development",
    description: "Our expert developers write clean, scalable code to bring your designs to life."
  },
  {
    number: "04",
    title: "Launch",
    description: "We perform rigorous testing and then deploy your project for the world to see."
  }
];

const OurProcess = () => {
  return (
    <section className={styles.process}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our <span className={styles.highlight}>Process</span></h2>
          <p className={styles.subtitle}>How we turn your ideas into successful digital products.</p>
        </div>
        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.number}>{step.number}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
              {index !== steps.length - 1 && <div className={styles.connector} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
