import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__glow}></div>
      
      <div className={styles.footer__container}>
        <div className={styles.footer__top}>
          {/* Brand Column */}
          <div className={styles.footer__brand}>
            <Link to="/" className={styles.footer__logo}>
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="url(#footerGradient)" />
                <path d="M10 22L16 10L22 22H10Z" fill="white" fillOpacity="0.9" />
                <circle cx="16" cy="18" r="2" fill="white" />
                <defs>
                  <linearGradient id="footerGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#818cf8" />
                    <stop offset="1" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </svg>
              <span>SkillMatch AI</span>
            </Link>
            <p className={styles.footer__tagline}>
              AI-powered hiring platform that matches the right talent with the right opportunities. Smarter matches. Faster decisions.
            </p>
            
            {/* Social Icons */}
            <div className={styles.footer__social}>
              <a href="https://www.linkedin.com/in/neerajkry/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com/Neeraj943050" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com/Neeraj62" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={styles.footer__nav}>
            <div className={styles.footer__navGroup}>
              <h4>Platform</h4>
              <ul>
                <li><Link to="/dashboard/jobs">Jobs</Link></li>
                <li><a href="#about" onClick={(e) => handleSmoothScroll(e, "about")}>About</a></li>
                <li><a href="#features" onClick={(e) => handleSmoothScroll(e, "features")}>Features</a></li>
                <li><a href="#gallery" onClick={(e) => handleSmoothScroll(e, "gallery")}>Gallery</a></li>
                <li><a href="#testimonials" onClick={(e) => handleSmoothScroll(e, "testimonials")}>Testimonials</a></li>
              </ul>
            </div>

            <div className={styles.footer__navGroup}>
              <h4>Contact Us</h4>
              <ul className={styles.contactList}>
                <li>
                  <a href="https://www.bdcet.in/contact" target="_blank" rel="noopener noreferrer">
                    Black Diamond College Road, Jharsuguda, Odisha 768201
                  </a>
                </li>
                <li>
                  <a href="tel:+917906503640">+91 7906503640</a>
                </li>
                <li>
                  <a href="mailto:info@bdcet.in">info@bdcet.in</a>
                </li>
              </ul>
            </div>

            <div className={styles.footer__navGroup}>
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className={styles.footer__newsletter}>
          <div className={styles.footer__newsletterContent}>
            <h4>Stay Updated</h4>
            <p>Get the latest news about AI recruiting and platform updates.</p>
          </div>
          <form className={styles.footer__newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footer__bottom}>
          <div className={styles.footer__copyright}>
            <p>&copy; {currentYear} SkillMatch AI. All rights reserved.</p>
            <p className={styles.footer__developer}>Developed by Neeraj Kumar</p>
          </div>
          <div className={styles.footer__bottomLinks}>
            <a href="#">Privacy</a>
            <span>·</span>
            <a href="#">Terms</a>
            <span>·</span>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
