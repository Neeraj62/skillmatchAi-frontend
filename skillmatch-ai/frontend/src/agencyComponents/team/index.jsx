import React from "react";
import styles from "./styles.module.scss";
import neerajImg from "../../assets/images/teams/neeraj.jpeg";
// Note: satyam.jpeg should be added to the same folder
// import satyamImg from "../../assets/images/teams/satyam.jpeg";

const team = [
  {
    name: "Satyam Kumar Srivastava",
    role: "Founder & Full-stack Developer",
    image: null,
    description: "Leading the vision and technical architecture of our digital solutions. Expert in MERN stack and AI integration.",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
  {
    name: "Neeraj Kumar",
    role: "Co-founder & Frontend Developer",
    image: neerajImg,
    description: "Crafting beautiful and intuitive user interfaces with modern frontend technologies like React and Tailwind CSS.",
    social: {
      linkedin: "https://www.linkedin.com/in/neerajkry/",
      github: "https://github.com/Neeraj62",
      twitter: "https://x.com/Neeraj943050"
    }
  }
];

const AgencyTeam = () => {
  return (
    <section className={styles.team} id="team">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>The Minds Behind <span className={styles.highlight}>SkillMatch</span></h2>
          <p className={styles.subtitle}>A dedicated team of experts committed to your success.</p>
        </div>
        <div className={styles.grid}>
          {team.map((member, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageContainer}>
                {member.image ? (
                  <img src={member.image} alt={member.name} className={styles.image} />
                ) : (
                  <div className={styles.placeholder}>
                    <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                )}
                <div className={styles.socialOverlay}>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>Li</a>
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>Gh</a>
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>Tw</a>
                </div>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.description}>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgencyTeam;
