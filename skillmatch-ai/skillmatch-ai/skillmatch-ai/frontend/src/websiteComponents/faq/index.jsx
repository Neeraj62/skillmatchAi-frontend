import React, { useState } from "react";
import styles from "./styles.module.scss";

const faqs = [
  {
    question: "How does SkillMatch AI work?",
    answer: "SkillMatch AI uses advanced machine learning algorithms to analyze job requirements and candidate profiles. It matches skills, experience, and preferences to find the best fit for both employers and job seekers.",
  },
  {
    question: "Is SkillMatch AI free to use?",
    answer: "Yes! Job seekers can use SkillMatch AI completely free. For recruiters, we offer flexible pricing plans based on hiring needs, including a free tier for small businesses.",
  },
  {
    question: "How accurate is the AI matching?",
    answer: "Our AI matching system has a 92% accuracy rate based on successful placements. The algorithm continuously learns from feedback to improve match quality over time.",
  },
  {
    question: "Can I upload my existing resume?",
    answer: "Absolutely! You can upload your resume in PDF, DOC, or DOCX format. Our AI will automatically parse and extract relevant information to build your profile.",
  },
  {
    question: "How long does the matching process take?",
    answer: "The AI matching process is nearly instant. Once your profile is complete, you will start receiving relevant job matches within seconds.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className={`${styles.faq__item} ${isOpen ? styles.faq__itemOpen : ""}`}>
      <button className={styles.faq__question} onClick={onClick}>
        <span>{faq.question}</span>
        <svg
          className={styles.faq__icon}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" className={styles.faq__iconVertical} />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div className={styles.faq__answerWrapper}>
        <p className={styles.faq__answer}>{faq.answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.faq__container}>
        <div className={styles.faq__header}>
          <span className={styles.faq__badge}>FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Got questions? We have got answers. Here are some of the most common questions about SkillMatch AI.</p>
        </div>

        <div className={styles.faq__list}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>

        <div className={styles.faq__cta}>
          <p>Still have questions?</p>
          <a href="/contact" className={styles.faq__ctaLink}>
            Contact our support team
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
