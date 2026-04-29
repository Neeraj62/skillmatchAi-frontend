import React from "react";
import styles from "./styles.module.scss";

const services = [
  {
    title: "Custom Web Apps",
    description: "End-to-end scalable web applications built with MERN stack, tailored to your business needs.",
    icon: "💻"
  },
  {
    title: "Mobile App Solutions",
    description: "High-performance iOS and Android apps using React Native for a seamless mobile experience.",
    icon: "📱"
  },
  {
    title: "AI & Automation",
    description: "Integrating smart AI features and automated workflows to streamline your operations.",
    icon: "🤖"
  },
  {
    title: "Career Mentorship",
    description: "Expert guidance on placement, resume building, and mastering technical interviews.",
    icon: "🎓"
  },
  {
    title: "UI/UX Modernization",
    description: "Revamping old interfaces into modern, user-centric designs that convert.",
    icon: "🎨"
  },
  {
    title: "E-commerce Growth",
    description: "Building robust online stores with secure payments and optimized user journeys.",
    icon: "🛍️"
  }
];

const AgencyServices = () => {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our <span className={styles.highlight}>Services</span></h2>
          <p className={styles.subtitle}>We provide end-to-end digital solutions tailored to your needs.</p>
        </div>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgencyServices;
