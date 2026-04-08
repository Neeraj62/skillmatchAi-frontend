import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobService } from "../../services";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineOfficeBuilding,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineXCircle,
  HiOutlineExternalLink,
} from "react-icons/hi";
import styles from "./dashboard.module.scss";

const UserApplications = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    if (!user?._id) return;
    try {
      const res = await jobService.getApplications(user._id);
      setApps(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [user?._id]);

  const handleRevoke = async id => {
    if (
      !window.confirm(
        "Are you sure you want to revoke this application? This action cannot be undone.",
      )
    )
      return;
    try {
      await jobService.revokeApplication(id);
      toast.success("Application revoked successfully");
      fetchApps(); // Refresh the list instead of navigating away
    } catch (err) {
      toast.error(err.message || "Failed to revoke application");
    }
  };

  return (
    <div className={styles.appsPage}>
      <div className={styles.appsHeader}>
        <h1>My Applications</h1>
        <p>Track the status of your job applications and career progress</p>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading your applications...</p>
        </div>
      ) : (
        <div className={styles.appsGridContainer}>
          {apps.length > 0 ? (
            <div className={styles.appsListGrid}>
              {apps.map((app, index) => (
                <motion.div
                  key={app._id}
                  className={styles.appModernCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.appCardTop}>
                    <div className={styles.companyIcon}>
                      <HiOutlineOfficeBuilding />
                    </div>
                    <div className={styles.jobInfo}>
                      <h3>{app.job?.title || "Deleted Job"}</h3>
                      <p className={styles.companyName}>SkillMatch Partner</p>
                    </div>
                    <div
                      className={styles.statusBadgeLarge}
                      data-status={app.status}
                    >
                      {app.status}
                    </div>
                  </div>

                  <div className={styles.appCardMid}>
                    <div className={styles.metaItem}>
                      <HiOutlineLocationMarker />{" "}
                      {app.job?.location || "Remote"}
                    </div>
                    <div className={styles.metaItem}>
                      <HiOutlineCalendar /> Applied{" "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </div>
                    {app.aiMatchScore && (
                      <div className={styles.matchScore}>
                        <HiOutlineSparkles /> {app.aiMatchScore}% AI Match
                      </div>
                    )}
                  </div>

                  <div className={styles.appCardFooter}>
                    <button className={styles.viewJobBtn}>
                      View Job <HiOutlineExternalLink />
                    </button>
                    {(app.status === "applied" ||
                      app.status === "screening") && (
                      <button
                        onClick={() => handleRevoke(app._id)}
                        className={styles.revokeBtn}
                      >
                        <HiOutlineXCircle /> Revoke
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyApps}>
              <h3>No applications yet</h3>
              <p>
                Start your journey by exploring available jobs that match your
                skills.
              </p>
              <button onClick={() => navigate("/dashboard/jobs")}>
                Explore Jobs
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserApplications;
