import React from "react";
import styles from "./styles.module.scss";

const AgencyContact = () => {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Let's <span className={styles.highlight}>Connect</span></h2>
          <p className={styles.subtitle}>Ready to start your digital journey? Contact us today.</p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <div className={styles.icon}>📍</div>
              <div>
                <h3>Our Location</h3>
                <p>Gautam Budh Nagar, Uttar Pradesh, 201308</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.icon}>📞</div>
              <div>
                <h3>Call Us</h3>
                <p>+91 7906503640</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.icon}>✉️</div>
              <div>
                <h3>Email Us</h3>
                <p>skillmatch.career@gmail.com</p>
              </div>
            </div>
          </div>
          
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className={styles.formGroup}>
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className={styles.formGroup}>
              <textarea placeholder="Tell us about your project" rows="5" required></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AgencyContact;
