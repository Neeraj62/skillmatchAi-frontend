import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { recruiterService } from "../../services";
import { toast } from "react-toastify";
import { HiOutlineSave, HiOutlinePlus, HiOutlineOfficeBuilding, HiOutlineGlobeAlt, HiOutlineLocationMarker, HiOutlineUsers } from "react-icons/hi";
import styles from "./dashboard.module.scss";

const CompanyProfile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const fetchProfileData = async () => {
    if (!user?._id) return;
    try {
      const res = await recruiterService.getProfile(user._id);
      setProfile(res.data);
      if (res.data?.companyLogoUrl) {
        setLogoPreview(res.data.companyLogoUrl);
      }
    } catch (err) {
      console.error("Error fetching recruiter profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [user?._id]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (logoFile) formData.append("logo", logoFile);
    if (!profile) formData.append("user", user._id);

    setIsSaving(true);
    try {
      let updatedProfile;
      if (profile) {
        updatedProfile = await recruiterService.updateProfile(user._id, formData);
      } else {
        updatedProfile = await recruiterService.createProfile(formData);
      }
      
      // Update global user context with the new logo
      if (updatedProfile.data?.companyLogoUrl) {
        const newUser = { ...user, avatarUrl: updatedProfile.data.companyLogoUrl };
        setUser(newUser);
        localStorage.setItem("auth_user", JSON.stringify(newUser));
      }

      toast.success("Company profile saved!");
      await fetchProfileData();
    } catch (err) {
      toast.error(err.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading company profile...</div>;

  return (
    <div className={styles.profilePage}>
      <header className={styles.profileHeader}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarLarge}>
            {logoPreview ? (
              <img src={logoPreview} alt="Company Logo" className={styles.avatarImg} />
            ) : (
              <HiOutlineOfficeBuilding />
            )}
          </div>
          <label className={styles.avatarUploadLabel}>
            <HiOutlinePlus />
            <input type="file" accept="image/*" onChange={handleLogoChange} className={styles.hiddenInput} />
          </label>
        </div>
        <div className={styles.headerInfo}>
          <h1>{profile?.companyName || "Your Company Name"}</h1>
          <p>{profile?.industry || "Industry"} • {profile?.location || "Location"}</p>
        </div>
      </header>

      <div className={styles.tabContent}>
        <form className={styles.profileForm} onSubmit={handleUpdateProfile}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label><HiOutlineOfficeBuilding /> Company Name</label>
              <input name="companyName" defaultValue={profile?.companyName} required placeholder="e.g. SkillMatch AI" />
            </div>
            <div className={styles.formGroup}>
              <label><HiOutlineGlobeAlt /> Website</label>
              <input name="companyWebsite" defaultValue={profile?.companyWebsite} placeholder="https://example.com" />
            </div>
            <div className={styles.formGroup}>
              <label><HiOutlineUsers /> Company Size</label>
              <select name="companySize" defaultValue={profile?.companySize || ""}>
                <option value="" disabled>Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-1000">201-1000 employees</option>
                <option value="1000+">1000+ employees</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label><HiOutlineLocationMarker /> Location</label>
              <input name="location" defaultValue={profile?.location} placeholder="e.g. San Francisco, CA" />
            </div>
            <div className={styles.formGroup}>
              <label>Industry</label>
              <input name="industry" defaultValue={profile?.industry} placeholder="e.g. Technology" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Company Description</label>
            <textarea name="companyDescription" defaultValue={profile?.companyDescription} rows="5" placeholder="Tell us about your company..." />
          </div>
          <button type="submit" className={styles.saveBtn} disabled={isSaving}>
            <HiOutlineSave /> {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfile;
