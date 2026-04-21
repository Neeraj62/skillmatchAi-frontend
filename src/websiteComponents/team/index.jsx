import React from "react";
import neerajImg from "../../assets/images/teams/neeraj.jpeg";
import mitrabhanuImg from "../../assets/images/teams/MITRABHANU.jpeg";
import jaiImg from "../../assets/images/teams/jai.jpeg";
import sovanImg from "../../assets/images/teams/sovan.jpeg";
import sumitImg from "../../assets/images/teams/sumit.jpeg";
import adityaImg from "../../assets/images/teams/aditya prasad.jpeg";
import ommImg from "../../assets/images/teams/om kumar bag.jpeg";
import styles from "./styles.module.scss";


const teamMembers = [
  {
    id: 1,
    name: "NEERAJ KUMAR",
    role: "2201309009",
    avatar: neerajImg,
    color: "#4F46E5"
  },
  {
    id: 2,
    name: "MITRABHANU NAIK",
    role: "2201309008",
    avatar: mitrabhanuImg,
    color: "#0891B2"
  },
  {
    id: 3,
    name: "JAY KUMAR BUDA",
    role: "2201309004",
    avatar: jaiImg,
    color: "#059669"
  },
  {
    id: 4,
    name: "SUMIT BHUYAN",
    role: "2201309013",
    avatar: sumitImg,
    color: "#D97706"
  },
  {
    id: 5,
    name: "ADITYA PRASAD SWAIN",
    role: "2201309001",
    avatar: adityaImg,
    color: "#DC2626"
  },
  {
    id: 6,
    name: "SOVAN KUMAR MISHRA",
    role: "2321309052",
    avatar: sovanImg,
    color: "#7C3AED"
  },
  {
    id: 7,
    name: "OMM KUMAR BAG",
    role: "2201309010",
    avatar: ommImg,
    color: "#0D9488"
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
  // Double the team members for seamless infinite scroll
  const duplicatedMembers = [...teamMembers, ...teamMembers];

  return (
    <section id="team" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Our Team</span>
          <h2 className={styles.title}>
            Meet the <span className={styles.gradient}>Brilliant Minds</span>
          </h2>
          <p className={styles.subtitle}>
            The passionate team behind SkillMatch AI, dedicated to transforming how companies hire talent.
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel}>
            <div className={styles.track}>
              {duplicatedMembers.map((member, index) => (
                <TeamCard key={`${member.id}-${index}`} member={member} />
              ))}
            </div>
          </div>
          {/* Gradient overlays for smooth edges */}
          <div className={styles.gradientLeft}></div>
          <div className={styles.gradientRight}></div>
        </div>
      </div>
    </section>
  );
};

export default Team;
