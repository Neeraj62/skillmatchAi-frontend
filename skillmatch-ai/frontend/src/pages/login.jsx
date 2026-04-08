import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineBriefcase, HiOutlineUser, HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineChartBar } from "react-icons/hi2";
import styles from "./auth.module.scss";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e?.preventDefault?.();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    
    const res = await login({ email, password });
    
    if (res.ok) {
      toast.success("Welcome back!");
      if (res.user.role === "recruiter") {
        navigate("/recruiter/home");
      } else {
        navigate("/dashboard/home");
      }
    } else {
      toast.error(res.message || "Invalid credentials");
    }
    
    setIsLoading(false);
  };

  const LogoSvg = () => (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="url(#gradient)" />
      <path d="M10 22L16 10L22 22H10Z" fill="white" fillOpacity="0.9" />
      <circle cx="16" cy="18" r="2" fill="white" />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
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
          
          <h2 className={styles.brandTitle}>Find Your Perfect Career Match</h2>
          <p className={styles.brandSubtitle}>
            AI-powered job matching that connects talent with opportunity. Join thousands of professionals advancing their careers.
          </p>

          <div className={styles.brandFeatures}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <HiOutlineSparkles />
              </div>
              <div className={styles.featureText}>
                <h4>AI-Powered Matching</h4>
                <p>Smart algorithms find your ideal job fit</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <HiOutlineShieldCheck />
              </div>
              <div className={styles.featureText}>
                <h4>Verified Companies</h4>
                <p>Only legitimate opportunities</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <HiOutlineChartBar />
              </div>
              <div className={styles.featureText}>
                <h4>Career Insights</h4>
                <p>Track your growth and progress</p>
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

          {/* Header */}
          <div className={styles.authHeader}>
            <h1>Welcome back</h1>
            <p>Sign in to continue to your account</p>
          </div>

          {/* Tab Menu */}
          <div className={styles.tabMenu}>
            <button
              className={`${styles.tab} ${activeTab === "user" ? styles.active : ""}`}
              onClick={() => setActiveTab("user")}
            >
              <HiOutlineUser />
              <span>Job Seeker</span>
            </button>
            <button
              className={`${styles.tab} ${activeTab === "recruiter" ? styles.active : ""}`}
              onClick={() => setActiveTab("recruiter")}
            >
              <HiOutlineBriefcase />
              <span>Recruiter</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className={styles.authForm}>
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

            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className={styles.forgotLink}>
                  Forgot?
                </Link>
              </div>
              <div className={styles.inputWrapper}>
                <HiOutlineLockClosed className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
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
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={styles.authFooter}>
            <p>
              Don't have an account?{" "}
              <Link to="/signup">Create account</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
