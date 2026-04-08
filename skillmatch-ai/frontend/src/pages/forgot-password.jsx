import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineArrowLeft, HiOutlineCheckCircle } from "react-icons/hi";
import { HiOutlineLockClosed, HiOutlineEnvelope, HiOutlineShieldCheck } from "react-icons/hi2";
import styles from "./auth.module.scss";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    toast.success("Reset link sent!");
    setIsLoading(false);
  };

  const LogoSvg = () => (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="url(#gradient3)" />
      <path d="M10 22L16 10L22 22H10Z" fill="white" fillOpacity="0.9" />
      <circle cx="16" cy="18" r="2" fill="white" />
      <defs>
        <linearGradient id="gradient3" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818cf8" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className={styles.authPage}>
      {/* Left Panel - Branding */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <Link to="/" className={styles.brandLogo}>
            <LogoSvg />
            <span>SkillMatch AI</span>
          </Link>
          
          <h2 className={styles.brandTitle}>Reset Your Password</h2>
          <p className={styles.brandSubtitle}>
            Don't worry, it happens to the best of us. We'll help you get back into your account quickly.
          </p>

          <div className={styles.brandFeatures}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <HiOutlineLockClosed />
              </div>
              <div className={styles.featureText}>
                <h4>Secure Reset</h4>
                <p>Your data remains protected</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <HiOutlineEnvelope />
              </div>
              <div className={styles.featureText}>
                <h4>Quick Email</h4>
                <p>Reset link sent instantly</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <HiOutlineShieldCheck />
              </div>
              <div className={styles.featureText}>
                <h4>24/7 Support</h4>
                <p>Help available anytime</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.brandDecor} />
      </div>

      {/* Right Panel - Form */}
      <div className={styles.formPanel}>
        <motion.div
          className={styles.authCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Mobile Logo */}
          <Link to="/" className={styles.mobileLogo}>
            <LogoSvg />
            <span>SkillMatch AI</span>
          </Link>

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className={styles.authHeader}>
                <h1>Forgot password?</h1>
                <p>We'll send you reset instructions</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className={styles.authForm}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email</label>
                  <div className={styles.inputWrapper}>
                    <HiOutlineMail className={styles.inputIcon} />
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className={styles.spinner}></span>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className={styles.successState}>
              <div className={styles.successIcon}>
                <HiOutlineCheckCircle />
              </div>
              <h2>Check your email</h2>
              <p>
                We sent a reset link to<br />
                <strong>{email}</strong>
              </p>
              <p className={styles.subText}>
                Didn't receive it?{" "}
                <button
                  type="button"
                  className={styles.resendBtn}
                  onClick={() => toast.success("Link resent!")}
                >
                  Resend
                </button>
              </p>
            </div>
          )}

          {/* Back to Login */}
          <div className={styles.backLink}>
            <Link to="/login">
              <HiOutlineArrowLeft />
              <span>Back to sign in</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
