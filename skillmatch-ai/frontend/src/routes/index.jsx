import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainPage from "../websitePages/mainPage";
import AgencyLandingPage from "../websitePages/agencyLandingPage";
import ContactPage from "../websitePages/contactPage";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import ForgotPasswordPage from "../pages/forgot-password";
import JobSeekerDashboard from "../Dashboard/jobSeekerDashboard";
import RecruiterDashboard from "../Dashboard/requirterDashboard";
import UserHome from "../pages/jobSeekerPages/home";
import UserJobs from "../pages/jobSeekerPages/jobs";
import UserApplications from "../pages/jobSeekerPages/applications";
import UserProfile from "../pages/jobSeekerPages/profile";
import RecruiterHome from "../pages/requirterPage/home";
import PostJob from "../pages/requirterPage/postJob";
import Candidates from "../pages/requirterPage/candidates";
import Company from "../pages/requirterPage/company";
import ProtectedRoute from "./ProtectedRoute";

const MotionWrapper = ({ children }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
};

const RoutesWithAnimation = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MotionWrapper><AgencyLandingPage /></MotionWrapper>} />
        <Route path="/platform" element={<MotionWrapper><MainPage /></MotionWrapper>} />
        <Route path="/contact" element={<MotionWrapper><ContactPage /></MotionWrapper>} />
        <Route path="/login" element={<MotionWrapper><LoginPage /></MotionWrapper>} />
        <Route path="/signup" element={<MotionWrapper><SignupPage /></MotionWrapper>} />
        <Route path="/forgot-password" element={<MotionWrapper><ForgotPasswordPage /></MotionWrapper>} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute requiredRole="user">
              <MotionWrapper><JobSeekerDashboard /></MotionWrapper>
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<MotionWrapper><UserHome /></MotionWrapper>} />
          <Route path="jobs" element={<MotionWrapper><UserJobs /></MotionWrapper>} />
          <Route path="applications" element={<MotionWrapper><UserApplications /></MotionWrapper>} />
          <Route path="profile" element={<MotionWrapper><UserProfile /></MotionWrapper>} />
        </Route>
        <Route
          path="/recruiter/*"
          element={
            <ProtectedRoute requiredRole="recruiter">
              <MotionWrapper><RecruiterDashboard /></MotionWrapper>
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<MotionWrapper><RecruiterHome /></MotionWrapper>} />
          <Route path="post-job" element={<MotionWrapper><PostJob /></MotionWrapper>} />
          <Route path="candidates" element={<MotionWrapper><Candidates /></MotionWrapper>} />
          <Route path="company" element={<MotionWrapper><Company /></MotionWrapper>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <RoutesWithAnimation />
    </BrowserRouter>
  );
};

export default AppRoutes;
