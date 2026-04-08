import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { candidateService, userService } from "../../services";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineUser, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineBadgeCheck, HiOutlineDocumentText, HiOutlineSave, HiOutlinePlus, HiOutlineTrash, HiOutlineCheckCircle, HiOutlineX, HiOutlineExternalLink, HiOutlineEye } from "react-icons/hi";
import styles from "./dashboard.module.scss";

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("info");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Data States
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [resumes, setResumes] = useState([]);
  
  // UI States
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showModal, setShowModal] = useState(null); // 'edu', 'exp', 'skill'
  const [editingItem, setEditingItem] = useState(null);
  const [previewResume, setPreviewResume] = useState(null); // Store resume object for preview

  const fetchProfileData = async () => {
    if (!user?._id) return;
    try {
      const [profileRes, resumesRes] = await Promise.all([
        candidateService.getProfile(user._id),
        userService.getResumes(user._id)
      ]);
      
      setProfile(profileRes.data);
      setResumes(resumesRes.data || []);
      if (profileRes.data?.avatarUrl) {
        setAvatarPreview(profileRes.data.avatarUrl);
      }
      
      if (profileRes.data?._id) {
        const [eduRes, expRes, skillRes] = await Promise.all([
          candidateService.getEducation(profileRes.data._id),
          candidateService.getExperience(profileRes.data._id),
          candidateService.getSkills(profileRes.data._id)
        ]);
        setEducation(eduRes.data || []);
        setExperience(expRes.data || []);
        setSkills(skillRes.data || []);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [user?._id]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Convert location fields to the structure backend expects
    const city = formData.get("location.city");
    const country = formData.get("location.country");
    formData.delete("location.city");
    formData.delete("location.country");
    formData.append("location[city]", city || "");
    formData.append("location[country]", country || "");

    if (avatarFile) formData.append("avatar", avatarFile);
    if (!profile) formData.append("user", user._id);
    
    setIsSaving(true);
    try {
      let updatedProfile;
      if (profile) {
        updatedProfile = await candidateService.updateProfile(user._id, formData);
      } else {
        updatedProfile = await candidateService.createProfile(formData);
      }
      
      // Update the user context if the avatar changed
      if (updatedProfile.data?.avatarUrl) {
        const newUser = { ...user, avatarUrl: updatedProfile.data.avatarUrl };
        setUser(newUser);
        localStorage.setItem("auth_user", JSON.stringify(newUser));
      }
      
      toast.success("Profile saved!");
      await fetchProfileData();
    } catch (err) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  // ─── CRUD Helpers ─────────────────────────────
  
  const handleAddEntity = async (type, data) => {
    if (!profile?._id) {
      toast.warning("Please save your basic info first");
      return;
    }
    
    try {
      if (type === "edu") await candidateService.addEducation({ ...data, candidateProfile: profile._id });
      if (type === "exp") await candidateService.addExperience({ ...data, candidateProfile: profile._id });
      if (type === "skill") await candidateService.addSkill({ ...data, candidateProfile: profile._id });
      
      toast.success("Added successfully");
      setShowModal(null);
      await fetchProfileData();
    } catch (err) {
      toast.error(err.message || "Failed to add");
    }
  };

  const handleDeleteEntity = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      // We need to add delete methods to candidateService
      if (type === "edu") await candidateService.deleteEducation(id);
      if (type === "exp") await candidateService.deleteExperience(id);
      if (type === "skill") await candidateService.deleteSkill(id);
      
      toast.success("Deleted successfully");
      await fetchProfileData();
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("user", user._id);
    
    try {
      // We need a resume upload service
      await candidateService.uploadResume(formData);
      toast.success("Resume uploaded!");
      await fetchProfileData();
    } catch (err) {
      toast.error(err.message || "Upload failed");
    }
  };

  if (loading) return <div className={styles.loading}>Loading profile...</div>;

  return (
    <div className={styles.profilePage}>
      <header className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarLarge}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile" className={styles.avatarImg} />
            ) : (
              user?.name?.split(" ").map(n => n[0]).join("") || "U"
            )}
          </div>
          <label className={styles.avatarUploadLabel}>
            <HiOutlinePlus />
            <input type="file" accept="image/*" onChange={handleAvatarChange} className={styles.hiddenInput} />
          </label>
        </div>
        <div className={styles.headerInfo}>
          <h1>{user?.name}</h1>
          <p>{profile?.headline || "Add a headline to your profile"}</p>
          <div className={styles.completionWrapper}>
            <div className={styles.completionBar}>
              <div className={styles.progress} style={{ width: `${profile?.profileCompletionPercentage || 0}%` }} />
            </div>
            <span className={styles.completionText}>{profile?.profileCompletionPercentage || 0}% Profile Strength</span>
          </div>
        </div>
      </header>

      <nav className={styles.profileTabs}>
        <button className={activeTab === "info" ? styles.activeTab : ""} onClick={() => setActiveTab("info")}><HiOutlineUser /> Info</button>
        <button className={activeTab === "edu" ? styles.activeTab : ""} onClick={() => setActiveTab("edu")}><HiOutlineAcademicCap /> Education</button>
        <button className={activeTab === "exp" ? styles.activeTab : ""} onClick={() => setActiveTab("exp")}><HiOutlineBriefcase /> Experience</button>
        <button className={activeTab === "skills" ? styles.activeTab : ""} onClick={() => setActiveTab("skills")}><HiOutlineBadgeCheck /> Skills</button>
        <button className={activeTab === "resume" ? styles.activeTab : ""} onClick={() => setActiveTab("resume")}><HiOutlineDocumentText /> Resumes</button>
      </nav>

      <div className={styles.tabContent}>
        {/* Info Tab */}
        {activeTab === "info" && (
          <form className={styles.profileForm} onSubmit={handleUpdateProfile}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}><label>Headline</label><input name="headline" defaultValue={profile?.headline} required /></div>
              <div className={styles.formGroup}><label>Phone</label><input name="phone" defaultValue={profile?.phone} /></div>
              <div className={styles.formGroup}><label>City</label><input name="location.city" defaultValue={profile?.location?.city} /></div>
              <div className={styles.formGroup}><label>Country</label><input name="location.country" defaultValue={profile?.location?.country} /></div>
              <div className={styles.formGroup}><label>LinkedIn</label><input name="linkedinUrl" defaultValue={profile?.linkedinUrl} /></div>
              <div className={styles.formGroup}><label>Github</label><input name="githubUrl" defaultValue={profile?.githubUrl} /></div>
            </div>
            <div className={styles.formGroup}><label>Summary</label><textarea name="summary" defaultValue={profile?.summary} rows="4" /></div>
            <button type="submit" className={styles.saveBtn} disabled={isSaving}><HiOutlineSave /> {isSaving ? "Saving..." : "Save Changes"}</button>
          </form>
        )}

        {/* Education Tab */}
        {activeTab === "edu" && (
          <div className={styles.entityList}>
            {education.map(edu => (
              <div key={edu._id} className={styles.entityCard}>
                <div className={styles.cardHeader}>
                  <h4>{edu.degree} in {edu.fieldOfStudy}</h4>
                  <button onClick={() => handleDeleteEntity("edu", edu._id)} className={styles.delIcon}><HiOutlineTrash /></button>
                </div>
                <p>{edu.institution}</p>
                <span>{edu.startYear} - {edu.endYear || "Present"} • Grade: {edu.grade || "N/A"}</span>
              </div>
            ))}
            <button onClick={() => setShowModal("edu")} className={styles.addBtn}><HiOutlinePlus /> Add Education</button>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "exp" && (
          <div className={styles.entityList}>
            {experience.map(exp => (
              <div key={exp._id} className={styles.entityCard}>
                <div className={styles.cardHeader}>
                  <h4>{exp.jobTitle} at {exp.company}</h4>
                  <button onClick={() => handleDeleteEntity("exp", exp._id)} className={styles.delIcon}><HiOutlineTrash /></button>
                </div>
                <span>{new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? "Present" : new Date(exp.endDate).getFullYear()}</span>
                <p className={styles.expDesc}>{exp.description}</p>
              </div>
            ))}
            <button onClick={() => setShowModal("exp")} className={styles.addBtn}><HiOutlinePlus /> Add Experience</button>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className={styles.skillsContainer}>
            <div className={styles.skillsGrid}>
              {skills.map(skill => (
                <div key={skill._id} className={styles.skillTag}>
                  {skill.skillName} <span>{skill.proficiencyLevel}</span>
                  <button onClick={() => handleDeleteEntity("skill", skill._id)}><HiOutlineX /></button>
                </div>
              ))}
            </div>
            <button onClick={() => setShowModal("skill")} className={styles.addBtn}><HiOutlinePlus /> Add Skill</button>
          </div>
        )}

        {/* Resume Tab */}
        {activeTab === "resume" && (
          <div className={styles.resumeList}>
            {resumes.map(resume => (
              <div key={resume._id} className={`${styles.resumeCard} ${resume.isPrimary ? styles.primary : ""}`}>
                <div className={styles.resumeInfo}>
                  <HiOutlineDocumentText className={styles.resumeIcon} />
                  <div>
                    <p className={styles.resumeName}>{resume.filename}</p>
                    <span className={styles.resumeSize}>{(resume.fileSize / 1024).toFixed(1)} KB • {resume.fileType.toUpperCase()}</span>
                  </div>
                </div>
                <div className={styles.resumeActions}>
                  <button onClick={() => setPreviewResume(resume)} className={styles.previewBtn} title="Preview Resume">
                    <HiOutlineEye />
                  </button>
                  <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.viewBtn} title="Open in New Tab">
                    <HiOutlineExternalLink />
                  </a>
                  {!resume.isPrimary && (
                    <button onClick={() => userService.setPrimaryResume(resume._id).then(fetchProfileData)} className={styles.actionBtn} title="Set Primary"><HiOutlineCheckCircle /></button>
                  )}
                  {resume.isPrimary && <span className={styles.primaryBadge}>Primary</span>}
                  <button onClick={() => userService.deleteResume(resume._id).then(fetchProfileData)} className={styles.deleteBtn}><HiOutlineTrash /></button>
                </div>
              </div>
            ))}
            <label className={styles.addBtn}>
              <HiOutlinePlus /> Upload Resume (PDF/DOCX)
              <input type="file" accept=".pdf,.docx" onChange={handleResumeUpload} className={styles.hiddenInput} />
            </label>
          </div>
        )}
      </div>

      {/* ─── Modals ───────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <div className={styles.modalOverlay} onClick={() => setShowModal(null)}>
            <motion.div 
              className={styles.modalContent} 
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className={styles.modalHeader}>
                <h3>{showModal === "edu" ? "Add Education" : showModal === "exp" ? "Add Experience" : "Add Skill"}</h3>
                <button onClick={() => setShowModal(null)}><HiOutlineX /></button>
              </div>
              
              <form onSubmit={e => {
                e.preventDefault();
                const data = Object.fromEntries(new FormData(e.target));
                if (showModal === "exp") data.isCurrent = e.target.isCurrent.checked;
                handleAddEntity(showModal, data);
              }}>
                {showModal === "edu" && (
                  <div className={styles.modalForm}>
                    <input name="degree" placeholder="Degree (e.g. B.Tech)" required />
                    <input name="institution" placeholder="University/College" required />
                    <input name="fieldOfStudy" placeholder="Field of Study" />
                    <div className={styles.flexRow}>
                      <input name="startYear" type="number" placeholder="Start Year" />
                      <input name="endYear" type="number" placeholder="End Year" />
                    </div>
                    <input name="grade" placeholder="Grade/CGPA" />
                  </div>
                )}
                
                {showModal === "exp" && (
                  <div className={styles.modalForm}>
                    <input name="jobTitle" placeholder="Job Title" required />
                    <input name="company" placeholder="Company Name" required />
                    <div className={styles.flexRow}>
                      <input name="startDate" type="date" required />
                      <input name="endDate" type="date" />
                    </div>
                    <label className={styles.checkboxLabel}><input name="isCurrent" type="checkbox" /> Currently working here</label>
                    <textarea name="description" placeholder="Responsibilities..." rows="3" />
                  </div>
                )}
                
                {showModal === "skill" && (
                  <div className={styles.modalForm}>
                    <input name="skillName" placeholder="Skill Name (e.g. React)" required />
                    <select name="proficiencyLevel">
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                )}
                
                <button type="submit" className={styles.saveBtn}>Add Entry</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                {previewResume.fileType === "pdf" ? (
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

export default UserProfile;
