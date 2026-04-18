import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { recruiterService } from "../../services";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlineDocumentText, 
  HiOutlineCheck, 
  HiOutlineX, 
  HiOutlineEye,
  HiOutlineBriefcase,
  HiOutlineExternalLink,
  HiOutlineSearch,
  HiOutlineFilter
} from "react-icons/hi";
import styles from "./dashboard.module.scss";

const Candidates = () => {
  const { user } = useAuth();
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewResume, setPreviewResume] = useState(null);

  const fetchApplicants = async () => {
    if (!user?._id) return;
    try {
      const res = await recruiterService.getAllApplicants(user._id);
      setApplicants(res.data || []);
      setFilteredApplicants(res.data || []);
    } catch (err) {
      console.error("Error fetching applicants:", err);
      toast.error("Failed to load applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [user?._id]);

  useEffect(() => {
    let result = applicants;
    if (searchTerm) {
      result = result.filter(app => 
        app.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job?.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      result = result.filter(app => app.status === statusFilter);
    }
    setFilteredApplicants(result);
  }, [searchTerm, statusFilter, applicants]);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await recruiterService.updateApplicationStatus(appId, { status: newStatus });
      toast.success(`Candidate ${newStatus}`);
      fetchApplicants();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className={styles.loading}>Loading applicants...</div>;

  return (
    <div className={styles.profilePage}>
      <header className={styles.profileHeader}>
        <div className={styles.headerInfo}>
          <h1>Candidate Management</h1>
          <p>Review and manage all applicants across your active job posts</p>
        </div>
      </header>

      <div className={styles.searchFilterBar}>
        <div className={styles.searchBox}>
          <HiOutlineSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by candidate name or job title..." 
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
            <option value="applied">Applied</option>
            <option value="screening">Screening</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="offered">Offered</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className={styles.applicantsContainer}>
        {filteredApplicants.length > 0 ? (
          <div className={styles.applicantsList}>
            {filteredApplicants.map((app, index) => (
              <motion.div 
                key={app._id} 
                className={styles.applicantCard}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={styles.applicantMain}>
                  <div className={styles.candidateAvatar}>
                    {app.user?.avatarUrl ? (
                      <img src={app.user.avatarUrl} alt={app.user.name} />
                    ) : (
                      <span>{app.user?.name.split(" ").map(n => n[0]).join("")}</span>
                    )}
                  </div>
                  <div className={styles.candidateInfo}>
                    <div className={styles.nameRow}>
                      <h3>{app.user?.name}</h3>
                      <span className={styles.statusBadgeLarge} data-status={app.status}>{app.status}</span>
                    </div>
                    <p className={styles.appliedFor}><HiOutlineBriefcase /> Applied for: <strong>{app.job?.title}</strong></p>
                    <div className={styles.contactRow}>
                      <span><HiOutlineMail /> {app.user?.email}</span>
                      <span>Applied on {new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.applicantActions}>
                  <div className={styles.resumeSection}>
                    {app.resume ? (
                      <button onClick={() => setPreviewResume(app.resume)} className={styles.previewResumeBtn}>
                        <HiOutlineEye /> View Resume
                      </button>
                    ) : (
                      <span className={styles.noResume}>No resume attached</span>
                    )}
                  </div>
                  <div className={styles.statusButtons}>
                    {app.status === "applied" || app.status === "screening" ? (
                      <>
                        <button onClick={() => handleStatusUpdate(app._id, "shortlisted")} className={styles.shortlistBtn} title="Shortlist">
                          <HiOutlineCheck /> Shortlist
                        </button>
                        <button onClick={() => handleStatusUpdate(app._id, "rejected")} className={styles.rejectBtn} title="Reject">
                          <HiOutlineX /> Reject
                        </button>
                      </>
                    ) : app.status === "shortlisted" ? (
                      <button onClick={() => handleStatusUpdate(app._id, "interview")} className={styles.shortlistBtn}>
                        Schedule Interview
                      </button>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <HiOutlineUser />
            <p>No candidates found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* ─── Resume Preview Modal ───────────────────────────── */}
      <AnimatePresence>
        {previewResume && (
          <div className={styles.modalOverlay} onClick={() => setPreviewResume(null)}>
            <motion.div 
              className={`${styles.modalContent} ${styles.previewModal}`} 
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <div className={styles.modalHeader}>
                <h3>{previewResume.filename}</h3>
                <div className={styles.headerActions}>
                  <a href={previewResume.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.iconBtn}>
                    <HiOutlineExternalLink />
                  </a>
                  <button onClick={() => setPreviewResume(null)}><HiOutlineX /></button>
                </div>
              </div>
              <div className={styles.previewContainer}>
                {previewResume.fileUrl.endsWith('.pdf') || previewResume.filename.toLowerCase().endsWith('.pdf') ? (
                  <iframe 
                    src={`${previewResume.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                    title="Resume Preview" 
                    className={styles.pdfViewer}
                  />
                ) : (
                  <div className={styles.docxPreview}>
                    <HiOutlineDocumentText className={styles.docxIcon} />
                    <p>DOCX files cannot be previewed directly in the browser.</p>
                    <a href={previewResume.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.downloadBtn}>
                      Download/View in New Tab
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Candidates;
