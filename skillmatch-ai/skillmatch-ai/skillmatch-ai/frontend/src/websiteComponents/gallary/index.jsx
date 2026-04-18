import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

// Import images from assets/images/clg
import img1 from "../../assets/images/clg/1.jpeg";
import img2 from "../../assets/images/clg/2.jpeg";
import img3 from "../../assets/images/clg/3.jpeg";
import img4 from "../../assets/images/clg/4.jpeg";
import img5 from "../../assets/images/clg/5.jpeg";
import img6 from "../../assets/images/clg/6.jpeg";

const galleryImages = [
  { id: 1, src: img1, title: "Modern Campus", category: "Infrastructure" },
  { id: 2, src: img2, title: "Tech Labs", category: "Learning" },
  { id: 3, src: img3, title: "Student Life", category: "Community" },
  { id: 4, src: img4, title: "Collaborative Spaces", category: "Workspace" },
  { id: 5, src: img5, title: "Events & Workshops", category: "Innovation" },
  { id: 6, src: img6, title: "Career Excellence", category: "Growth" },
];

const GallaryComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.badge}
          >
            Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.title}
          >
            Experience Our <span className={styles.gradient}>Vibrant Campus</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.subtitle}
          >
            Take a look at the state-of-the-art facilities and dynamic environment where innovation thrives.
          </motion.p>
        </div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.grid}
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className={styles.item}
              whileHover={{ y: -10 }}
            >
              <img
                src={image.src}
                alt={image.title}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.overlay}>
                <div className={styles.overlayContent}>
                  <p>{image.category}</p>
                  <h4>{image.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GallaryComponent;