import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { recruiterService } from "../../services";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlinePlus, 
  HiOutlineTrash, 
  HiOutlinePencil, 
  HiOutlineBriefcase, 
  HiOutlineLocationMarker, 
  HiOutlineCurrencyRupee,
  HiOutlineUserGroup,
  HiOutlineX,
  HiOutlineCheckCircle,
  HiOutlineClock
} from "react-icons/hi";
import styles from "./dashboard.module.scss";

const PostJob = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchJobs = async () => {
    if (!user?._id) return;
    try {
      const res = await recruiterService.getRecruiterJobs(user._id);
      setJobs(res.data || []);
      setFilteredJobs(res.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user?._id]);

  useEffect(() => {
    let result = jobs;
    if (searchTerm) {
      result = result.filter(j => 
        j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        j.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(j => j.status === statusFilter);
    }
    setFilteredJobs(result);
  }, [searchTerm, statusFilter, jobs]);

  const handleToggleStatus = async (job) => {
    const newStatus = job.status === "active" ? "paused" : "active";
    try {
      await recruiterService.updateJob(job._id, { status: newStatus });
      toast.success(`Job ${newStatus === 'active' ? 'activated' : 'paused'}`);
      fetchJobs();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job post?")) return;
    try {
      await recruiterService.deleteJob(id);
      toast.success("Job deleted successfully");
      fetchJobs();
    } catch (err) {
      toast.error("Failed to delete job");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Process skills arrays
    data.requiredSkills = data.requiredSkills.split(",").map(s => s.trim()).filter(s => s);
    data.niceToHaveSkills = data.niceToHaveSkills.split(",").map(s => s.trim()).filter(s => s);
    data.recruiterId = user._id;

    setIsSaving(true);
    try {
      if (editingJob) {
        await recruiterService.updateJob(editingJob._id, data);
        toast.success("Job updated successfully");
      } else {
        await recruiterService.createJob(data);
        toast.success("Job posted successfully");
      }
      setShowModal(false);
      setEditingJob(null);
      fetchJobs();
    } catch (err) {
      toast.error(err.message || "Failed to save job");
    } finally {
      setIsSaving(false);
    }
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setShowModal(true);
  };

  if (loading) return <div className={styles.loading}>Loading jobs...</div>;

  return (
    <div className={styles.profilePage}>
      <header className={styles.profileHeader}>
        <div className={styles.headerInfo}>
          <h1>Manage Job Posts</h1>
          <p>Create and manage your company's job openings</p>
        </div>
        <button onClick={() => { setEditingJob(null); setShowModal(true); }} className={styles.addBtnHeader}>
          <HiOutlinePlus /> Post New Job
        </button>
      </header>

      <div className={styles.searchFilterBar}>
        <div className={styles.searchBox}>
          <HiOutlineBriefcase className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by job title or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.statusSelect}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <div className={styles.jobsContainer}>
        <div className={styles.jobsGrid}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <motion.div 
                key={job._id} 
                className={`${styles.jobManageCard} ${job.status !== 'active' ? styles.paused : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={styles.cardMain}>
                  <div className={styles.jobIcon}>
                    <HiOutlineBriefcase />
                  </div>
                  <div className={styles.jobDetails}>
                    <div className={styles.titleRow}>
                      <h3>{job.title}</h3>
                      <span className={styles.postedDate}>
                        {new Date(job.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div className={styles.jobBadges}>
                      <span><HiOutlineLocationMarker /> {job.location || "Remote"}</span>
                      <span><HiOutlineClock /> {job.jobType}</span>
                      <span><HiOutlineUserGroup /> {job.experienceLevel}</span>
                      {job.salaryMin && (
                        <span><HiOutlineCurrencyRupee /> {job.salaryMin / 1000}k - {job.salaryMax / 1000}k</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.jobStatsMini}>
                    <div className={styles.statItem}>
                      <strong>{job.applicationsCount || 0}</strong>
                      <span>Applicants</span>
                    </div>
                    <div className={styles.statItem}>
                      <strong>{job.viewsCount || 0}</strong>
                      <span>Views</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardActions}>
                  <div className={styles.statusToggle}>
                    <span className={styles.statusLabel} data-status={job.status}>{job.status}</span>
                    <button 
                      onClick={() => handleToggleStatus(job)} 
                      className={styles.toggleBtn}
                      title={job.status === 'active' ? 'Pause Hiring' : 'Resume Hiring'}
                    >
                      {job.status === 'active' ? <HiOutlineCheckCircle /> : <HiOutlineClock />}
                    </button>
                  </div>
                  <div className={styles.actionButtons}>
                    <button onClick={() => openEditModal(job)} className={styles.editBtn} title="Edit"><HiOutlinePencil /></button>
                    <button onClick={() => handleDeleteJob(job._id)} className={styles.deleteBtn} title="Delete"><HiOutlineTrash /></button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <HiOutlineBriefcase />
              <p>You haven't posted any jobs yet.</p>
              <button onClick={() => setShowModal(true)}>Post Your First Job</button>
            </div>
          )}
        </div>
      </div>

      {/* ─── Post/Edit Job Modal ───────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <motion.div 
              className={`${styles.modalContent} ${styles.jobModal}`} 
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className={styles.modalHeader}>
                <h3>{editingJob ? "Edit Job Post" : "Post New Job"}</h3>
                <button onClick={() => setShowModal(false)}><HiOutlineX /></button>
              </div>
              
              <form onSubmit={handleSubmit} className={styles.jobForm}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Job Title</label>
                    <input name="title" defaultValue={editingJob?.title} required placeholder="e.g. Senior Frontend Developer" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Location</label>
                    <input name="location" defaultValue={editingJob?.location} required placeholder="e.g. Bangalore, Remote" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Job Type</label>
                    <select name="jobType" defaultValue={editingJob?.jobType || "full-time"} required>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="remote">Remote</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Experience Level</label>
                    <select name="experienceLevel" defaultValue={editingJob?.experienceLevel || "entry"} required>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="lead">Lead</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Min Salary (Monthly INR)</label>
                    <input name="salaryMin" type="number" defaultValue={editingJob?.salaryMin} placeholder="e.g. 50000" />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Max Salary (Monthly INR)</label>
                    <input name="salaryMax" type="number" defaultValue={editingJob?.salaryMax} placeholder="e.g. 80000" />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Required Skills (comma separated)</label>
                  <input name="requiredSkills" defaultValue={editingJob?.requiredSkills?.join(", ")} placeholder="React, Node.js, MongoDB" required />
                </div>

                <div className={styles.formGroup}>
                  <label>Nice to Have Skills (comma separated)</label>
                  <input name="niceToHaveSkills" defaultValue={editingJob?.niceToHaveSkills?.join(", ")} placeholder="Docker, AWS, TypeScript" />
                </div>

                <div className={styles.formGroup}>
                  <label>Job Description</label>
                  <textarea name="description" defaultValue={editingJob?.description} rows="5" required placeholder="Describe the role, responsibilities, and requirements..." />
                </div>

                <div className={styles.formGroup}>
                  <label>Application Deadline</label>
                  <input name="applicationDeadline" type="date" defaultValue={editingJob?.applicationDeadline?.split('T')[0]} />
                </div>

                <div className={styles.modalFooter}>
                  <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
                  <button type="submit" className={styles.submitBtn} disabled={isSaving}>
                    {isSaving ? "Saving..." : editingJob ? "Update Job" : "Post Job"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostJob;
