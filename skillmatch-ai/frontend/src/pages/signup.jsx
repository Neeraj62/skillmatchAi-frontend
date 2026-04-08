import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineUser as HiOutlineUserIcon } from "react-icons/hi";
import { HiOutlineBriefcase, HiOutlineUser, HiOutlineRocketLaunch, HiOutlineBuildingOffice, HiOutlineUserGroup } from "react-icons/hi2";
import styles from "./auth.module.scss";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSignup = async (e) => {
    e?.preventDefault?.();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the terms");
      return;
    }

    setIsLoading(true);
    
    const res = await signup({
      name: fullName,
      email,
      password,
      role: activeTab
    });

    if (res.ok) {
      toast.success("Account created successfully!");
      if (res.user.role === "recruiter") {
        navigate("/recruiter/home");
      } else {
        navigate("/dashboard/home");
      }
    } else {
      toast.error(res.message || "Signup failed");
    }
    
    setIsLoading(false);
  };

  const LogoSvg = () => (
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="url(#gradient2)" />
      <path d="M10 22L16 10L22 22H10Z" fill="white" fillOpacity="0.9" />
      <circle cx="16" cy="18" r="2" fill="white" />
      <defs>
        <linearGradient id="gradient2" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
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
          
          <h2 className={styles.brandTitle}>Start Your Journey Today</h2>
          <p className={styles.brandSubtitle}>
            Whether you're looking for your dream job or the perfect candidate, we've got you covered.
          </p>

          <div className={styles.brandFeatures}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <HiOutlineRocketLaunch />
              </div>
              <div className={styles.featureText}>
                <h4>Quick Setup</h4>
                <p>Get started in under 2 minutes</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <HiOutlineBuildingOffice />
              </div>
              <div className={styles.featureText}>
                <h4>Top Companies</h4>
                <p>Access to leading employers</p>
              </div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <HiOutlineUserGroup />
              </div>
              <div className={styles.featureText}>
                <h4>Growing Network</h4>
                <p>Join 50,000+ professionals</p>
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
            <h1>Create account</h1>
            <p>Join us and find your perfect match</p>
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
          <form onSubmit={handleSignup} className={styles.authForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="fullName">Full name</label>
              <div className={styles.inputWrapper}>
                <HiOutlineUserIcon className={styles.inputIcon} />
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>

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
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <HiOutlineLockClosed className={styles.inputIcon} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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

            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className={styles.inputWrapper}>
                <HiOutlineLockClosed className={styles.inputIcon} />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span className={styles.checkmark}></span>
                <span>
                  I agree to the{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>{" "}
                  and{" "}
                  <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className={styles.spinner}></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={styles.authFooter}>
            <p>
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
