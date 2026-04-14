import React from "react";
import styles from "./styles.module.scss";

const testimonials = [
  {
    id: 1,
    name: "Mrs. Jhunurani Patel",
    role: "Assistant Professor",
    company: "Academic Mentor",
    avatar: "JP",
    rating: 5,
    quote: "SkillMatch AI provides our students with a clear roadmap from academic learning to professional success. It's a game-changer for our campus placements and career counseling.",
    type: "recruiter"
  },
  {
    id: 2,
    name: "Ms. Samita Jaipuria",
    role: "Academic Mentor",
    company: "",
    avatar: "SJ",
    rating: 5,
    quote: "The AI-driven skill mapping is incredibly precise. It helps us identify students' true potential and connects them with roles where they can truly excel and innovate.",
    type: "candidate"
  },
  {
    id: 3,
    name: "Ms. Rukhshar Parveen",
    role: "Academic Mentor",
    company: "",
    avatar: "RP",
    rating: 5,
    quote: "Managing student profiles and tracking their industry readiness has never been easier. This platform bridges the gap between classroom theory and real-world application.",
    type: "candidate"
  }
];

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" opacity="0.1">
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
  </svg>
);

const Testimonials = () => {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Testimonials</span>
          <h2 className={styles.title}>
            Loved by <span className={styles.gradient}>Recruiters & Candidates</span>
          </h2>
          <p className={styles.subtitle}>
            See how SkillMatch AI is transforming the hiring experience for companies and job seekers alike.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`${styles.card} ${testimonial.type === 'recruiter' ? styles.featured : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.quoteIcon}>
                <QuoteIcon />
              </div>
              
              {/* Rating */}
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className={styles.star}>
                    <StarIcon />
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className={styles.quote}>
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonial.avatar}
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.name}>{testimonial.name}</h4>
                  <p className={styles.role}>{testimonial.role}</p>
                  <p className={styles.company}>{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4.9/5</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10,000+</span>
            <span className={styles.statLabel}>Happy Users</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50,000+</span>
            <span className={styles.statLabel}>Successful Matches</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
