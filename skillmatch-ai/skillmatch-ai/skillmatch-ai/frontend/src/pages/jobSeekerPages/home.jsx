import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/auth";
import { jobService, candidateService } from "../../services";
import styles from "./dashboard.module.scss";

const UserHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { label: "Applications Sent", value: "0", change: "" },
    { label: "Profile Completion", value: "0%", change: "" },
    { label: "Recommended Jobs", value: "0", change: "" },
    { label: "Saved Jobs", value: "0", change: "" },
  ]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?._id) return;
      
      try {
        const [appsRes, profileRes, jobsRes] = await Promise.all([
          jobService.getApplications(user._id),
          candidateService.getProfile(user._id),
          jobService.getJobs()
        ]);

        const appsCount = appsRes.data?.length || 0;
        const completion = profileRes.data?.profileCompletionPercentage || 0;
        const jobsCount = jobsRes.data?.length || 0;

        setStats([
          { label: "Applications Sent", value: appsCount.toString(), change: "Check status" },
          { label: "Profile Completion", value: `${completion}%`, change: "Complete profile" },
          { label: "Available Jobs", value: jobsCount.toString(), change: "New matches" },
          { label: "Interview Invites", value: "0", change: "Stay tuned" },
        ]);

        setRecommendedJobs(jobsRes.data?.slice(0, 3) || []);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?._id]);

  const recentActivity = [
    { type: "welcome", title: `Welcome to SkillMatch AI, ${user?.name}!`, time: "Just now" },
  ];

  return (
    <div className={styles.dashboard}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.header}
      >
        <h1>Welcome back, {user?.name || "Job Seeker"}</h1>
        <p>Here is your job search overview</p>
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
          <h2>Recent Activity</h2>
          <div className={styles.activityList}>
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                className={styles.activityItem}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className={styles.activityDot} data-type={activity.type} />
                <div className={styles.activityContent}>
                  <p>{activity.title}</p>
                  <span>{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.recommendedSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h2>Recommended Jobs</h2>
          <div className={styles.jobsList}>
            {recommendedJobs.length > 0 ? (
              recommendedJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  className={styles.jobCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={styles.jobHeader}>
                    <h4>{job.title}</h4>
                    <span className={styles.jobType}>{job.jobType}</span>
                  </div>
                  <div className={styles.jobMeta}>
                    <span>{job.location}</span>
                    <span>{job.salaryMin ? `${job.salaryMin} - ${job.salaryMax} ${job.salaryCurrency}` : "Salary undisclosed"}</span>
                  </div>
                  <div className={styles.jobSkills}>
                    {job.requiredSkills?.slice(0, 3).map((skill) => (
                      <span key={skill} className={styles.skillBadge}>{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserHome;
