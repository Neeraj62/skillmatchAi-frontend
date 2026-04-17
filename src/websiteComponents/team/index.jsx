import React from "react";
import neerajImg from "../../assets/images/teams/neeraj.jpeg";
import styles from "./styles.module.scss";


const teamMembers = [
  {
    id: 1,
    name: "NEERAJ KUMAR",
    role: "Full-Stack Developer",
    avatar: neerajImg,
    color: "#4F46E5"
  }
];

const TeamCard = ({ member }) => (
  <div className={styles.card}>
    <div 
      className={styles.avatar} 
      style={{ backgroundColor: member.color, overflow: 'hidden' }}
    >
      {member.avatar?.length > 2 ? (
        <img src={member.avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        member.avatar || "NK"
      )}
    </div>
    <h4 className={styles.name}>{member.name}</h4>
    <p className={styles.role}>{member.role}</p>
  </div>
);

const Team = () => {
  return (
    <section id="team" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Developer</span>
          <h2 className={styles.title}>
            Meet the <span className={styles.gradient}>Brilliant Mind</span>
          </h2>
          <p className={styles.subtitle}>
            The passionate developer behind SkillMatch AI, dedicated to transforming how companies hire talent.
          </p>
        </div>

        {/* Developer Display */}
        <div className={styles.developerDisplay}>
          <TeamCard member={teamMembers[0]} />
        </div>
      </div>
    </section>
  );
};

export default Team;
