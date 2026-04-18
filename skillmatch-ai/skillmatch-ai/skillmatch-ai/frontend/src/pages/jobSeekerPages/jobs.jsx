import React, { useEffect, useState } from "react";
import { jobService, userService } from "../../services";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineLocationMarker, 
  HiOutlineBriefcase, 
  HiOutlineCurrencyRupee, 
  HiOutlineClock, 
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineArrowNarrowRight,
  HiOutlineOfficeBuilding
} from "react-icons/hi";
import styles from "./dashboard.module.scss";

const UserJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jobType: "all",
    experienceLevel: "all"
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchTerm,
        jobType: filters.jobType === "all" ? undefined : filters.jobType,
        experienceLevel: filters.experienceLevel === "all" ? undefined : filters.experienceLevel
      };
      const res = await jobService.getJobs(params);
      setJobs(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, filters]);

  const handleApply = async (jobId) => {
    if (!user?._id) return;
    try {
      const resumesRes = await userService.getResumes(user._id);
      const primaryResume = resumesRes.data?.find(r => r.isPrimary) || resumesRes.data?.[0];
      
      if (!primaryResume) {
        toast.warning("Please upload a resume in your profile first");
        return;
      }

      const appData = {
        user: user._id,
        job: jobId,
        resume: primaryResume._id,
        coverLetter: "Interested in this position."
      };
      await jobService.applyForJob(appData);
      toast.success("Applied successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to apply");
    }
  };

  return (
    <div className={styles.jobsPage}>
      <div className={styles.jobsHeader}>
        <div className={styles.titleSection}>
          <h1>Discover Your Next Career</h1>
          <p>Find and apply to the best opportunities matched for your skills</p>
        </div>
        
        <div className={styles.searchSection}>
          <div className={styles.searchBarLarge}>
            <HiOutlineSearch className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search by job title, skills, or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.filterRow}>
            <div className={styles.filterItem}>
              <HiOutlineBriefcase />
              <select 
                value={filters.jobType} 
                onChange={(e) => setFilters({...filters, jobType: e.target.value})}
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            
            <div className={styles.filterItem}>
              <HiOutlineClock />
              <select 
                value={filters.experienceLevel} 
                onChange={(e) => setFilters({...filters, experienceLevel: e.target.value})}
              >
                <option value="all">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Finding the best jobs for you...</p>
        </div>
      ) : (
        <div className={styles.jobsGridContainer}>
          {jobs.length > 0 ? (
            <div className={styles.jobsListGrid}>
              {jobs.map((job, index) => (
                <motion.div 
                  key={job._id} 
                  className={styles.jobExplorerCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.companyLogo}>
                      {job.recruiterId?.avatarUrl ? (
                        <img src={job.recruiterId.avatarUrl} alt="Company" />
                      ) : (
                        <HiOutlineOfficeBuilding />
                      )}
                    </div>
                    <div className={styles.mainInfo}>
                      <h3>{job.title}</h3>
                      <p className={styles.companyName}>{job.recruiterId?.name || "SkillMatch Partner"}</p>
                    </div>
                    <div className={styles.jobTypeBadge}>{job.jobType}</div>
                  </div>
                  
                  <div className={styles.cardMid}>
                    <div className={styles.infoPill}>
                      <HiOutlineLocationMarker /> {job.location || "Remote"}
                    </div>
                    <div className={styles.infoPill}>
                      <HiOutlineCurrencyRupee /> {job.salaryMin ? `${job.salaryMin / 1000}k - ${job.salaryMax / 1000}k` : "Not disclosed"}
                    </div>
                    <div className={styles.infoPill}>
                      <HiOutlineBriefcase /> {job.experienceLevel}
                    </div>
                  </div>
                  
                  <div className={styles.skillsRow}>
                    {job.requiredSkills?.slice(0, 3)?.map(skill => (
                      <span key={skill} className={styles.skillTag}>{skill}</span>
                    ))}
                    {job.requiredSkills?.length > 3 && (
                      <span className={styles.moreSkills}>+{job.requiredSkills.length - 3} more</span>
                    )}
                  </div>
                  
                  <div className={styles.cardFooter}>
                    <span className={styles.postedOn}>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                    <button onClick={() => handleApply(job._id)} className={styles.exploreApplyBtn}>
                      Apply Now <HiOutlineArrowNarrowRight />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <HiOutlineSearch />
              <h3>No jobs found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button onClick={() => { setSearchTerm(""); setFilters({jobType: "all", experienceLevel: "all"}); }}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserJobs;

