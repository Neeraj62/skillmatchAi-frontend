import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/auth";
import { recruiterService } from "../../services";
import styles from "./dashboard.module.scss";

const RecruiterHome = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState([
    { label: "Active Job Posts", value: "0", change: "" },
    { label: "Total Applications", value: "0", change: "" },
    { label: "Interviews Scheduled", value: "0", change: "" },
    { label: "Positions Filled", value: "0", change: "" },
  ]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecruiterData = async () => {
      if (!user?._id) return;
      
      try {
        const [profileRes, jobsRes] = await Promise.all([
          recruiterService.getProfile(user._id),
          recruiterService.getRecruiterJobs(user._id)
        ]);
        
        setProfile(profileRes.data);
        const jobs = jobsRes.data || [];
        
        const activeJobsCount = jobs.filter(j => j.status === "active").length;
        const totalApps = jobs.reduce((sum, j) => sum + (j.applicationsCount || 0), 0);

        setStats([
          { label: "Active Job Posts", value: activeJobsCount.toString(), change: "Manage posts" },
          { label: "Total Applications", value: totalApps.toString(), change: "New candidates" },
          { label: "Interviews Scheduled", value: "0", change: "Keep track" },
          { label: "Positions Filled", value: "0", change: "View reports" },
        ]);

        setActiveJobs(jobs.slice(0, 3));
        
        // Fetch applicants for the first active job as "recent" for demo
        if (jobs.length > 0) {
          const appsRes = await recruiterService.getApplicants(jobs[0]._id);
          setRecentApplications(appsRes.data?.slice(0, 4) || []);
        }
      } catch (error) {
        console.error("Recruiter dashboard fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecruiterData();
  }, [user?._id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "New": return "#818cf8";
      case "Reviewed": return "#22d3ee";
      case "Shortlisted": return "#22c55e";
      default: return "#71717a";
    }
  };

  return (
    <div className={styles.dashboard}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.header}
      >
        <div className={styles.welcomeInfo}>
          <h1>Welcome back, {user?.name || "Recruiter"}</h1>
          <p>{profile?.companyName ? `Managing ${profile.companyName}` : "Complete your company profile to start hiring"}</p>
        </div>
      </motion.div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <h3>{stat.value}</h3>
            <p className={styles.statLabel}>{stat.label}</p>
            <span className={styles.statChange}>{stat.change}</span>
          </motion.div>
        ))}
      </div>

      <div className={styles.gridContainer}>
        <motion.div
          className={styles.activitySection}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h2>Recent Applications</h2>
          <div className={styles.applicantsList}>
            {recentApplications.length > 0 ? (
              recentApplications.map((app, index) => (
                <motion.div
                  key={app._id}
                  className={styles.applicantItem}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className={styles.applicantAvatar}>
                    {app.user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                  </div>
                  <div className={styles.applicantContent}>
                    <p className={styles.applicantName}>{app.user?.name}</p>
                    <span className={styles.applicantPosition}>{app.job?.title}</span>
                  </div>
                  <div className={styles.applicantMeta}>
                    <span 
                      className={styles.statusBadge}
                      style={{ background: getStatusColor(app.status) }}
                    >
                      {app.status}
                    </span>
                    <span className={styles.time}>{new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No recent applications found.</p>
            )}
          </div>
        </motion.div>

        <motion.div
          className={styles.recommendedSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h2>Active Job Posts</h2>
          <div className={styles.activeJobsList}>
            {activeJobs.length > 0 ? (
              activeJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  className={styles.jobItem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className={styles.jobInfo}>
                    <p className={styles.jobTitle}>{job.title}</p>
                    <span className={styles.jobPosted}>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.jobStats}>
                    <span className={styles.appCount}>{job.applicationsCount || 0} apps</span>
                    <span className={styles.statusBadge} data-status={job.status}>{job.status}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No active jobs found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecruiterHome;
