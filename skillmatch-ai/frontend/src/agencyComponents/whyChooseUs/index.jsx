import React from "react";
import styles from "./styles.module.scss";

const reasons = [
  {
    title: "Modern Tech Stack",
    description: "We use the latest technologies like React, Node.js, and AI to build future-ready solutions.",
    icon: "⚡"
  },
  {
    title: "Client-Centric Approach",
    description: "Your vision is our priority. We work closely with you to ensure every detail matches your expectations.",
    icon: "🤝"
  },
  {
    title: "Scalable Architecture",
    description: "Our solutions are built to grow with your business, ensuring long-term success and stability.",
    icon: "📈"
  },
  {
    title: "On-Time Delivery",
    description: "We value your time. Our agile process ensures that we deliver high-quality results within deadlines.",
    icon: "⏱️"
  }
];

const WhyChooseUs = () => {
  return (
    <section className={styles.whyUs}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why <span className={styles.highlight}>Choose Us</span></h2>
          <p className={styles.subtitle}>We combine creativity with technical expertise to deliver outstanding results.</p>
        </div>
        <div className={styles.grid}>
          {reasons.map((reason, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{reason.icon}</div>
              <h3 className={styles.cardTitle}>{reason.title}</h3>
              <p className={styles.cardDescription}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
