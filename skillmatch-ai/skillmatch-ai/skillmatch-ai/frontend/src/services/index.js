import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach the access token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors (like token expiration)
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle specific error cases (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      // Clear token and redirect to login if necessary
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;

// Auth API endpoints
export const authService = {
  signup: (userData) => apiClient.post("/auth/signup", userData),
  login: (credentials) => apiClient.post("/auth/login", credentials),
  logout: () => apiClient.post("/auth/logout"),
};

// User Profile API endpoints
export const userService = {
  getProfile: (userId) => apiClient.get(`/users/${userId}`),
  updateUser: (userId, userData) => apiClient.put(`/users/${userId}`, userData),
  getResumes: (userId) => apiClient.get(`/resume/user/${userId}`),
  setPrimaryResume: (resumeId) => apiClient.patch(`/resume/${resumeId}/primary`),
  deleteResume: (resumeId) => apiClient.delete(`/resume/${resumeId}`),
};

// Candidate Profile API endpoints
export const candidateService = {
  getProfile: (userId) => apiClient.get(`/candidate-profile/${userId}`),
  createProfile: (profileData) => apiClient.post("/candidate-profile", profileData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
  updateProfile: (userId, profileData) => apiClient.put(`/candidate-profile/${userId}`, profileData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
  addSkill: (skillData) => apiClient.post("/candidate-skill", skillData),
  getSkills: (profileId) => apiClient.get(`/candidate-skill/profile/${profileId}`),
  deleteSkill: (skillId) => apiClient.delete(`/candidate-skill/${skillId}`),
  addEducation: (eduData) => apiClient.post("/candidate-education", eduData),
  getEducation: (profileId) => apiClient.get(`/candidate-education/profile/${profileId}`),
  deleteEducation: (eduId) => apiClient.delete(`/candidate-education/${eduId}`),
  addExperience: (expData) => apiClient.post("/candidate-experience", expData),
  getExperience: (profileId) => apiClient.get(`/candidate-experience/profile/${profileId}`),
  deleteExperience: (expId) => apiClient.delete(`/candidate-experience/${expId}`),
  uploadResume: (resumeData) => apiClient.post("/resume", resumeData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
};

// Recruiter API endpoints
export const recruiterService = {
  getProfile: (userId) => apiClient.get(`/recruiter-profile/${userId}`),
  createProfile: (profileData) => apiClient.post("/recruiter-profile", profileData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
  updateProfile: (userId, profileData) => apiClient.put(`/recruiter-profile/${userId}`, profileData, {
    headers: { "Content-Type": "multipart/form-data" }
  }),
  createJob: (jobData) => apiClient.post("/job", jobData),
  getJobs: () => apiClient.get("/job"),
  getJobById: (jobId) => apiClient.get(`/job/${jobId}`),
  updateJob: (jobId, jobData) => apiClient.put(`/job/${jobId}`, jobData),
  getRecruiterJobs: (recruiterId) => apiClient.get(`/job/recruiter/${recruiterId}`),
  deleteJob: (jobId) => apiClient.delete(`/job/${jobId}`),
  getAllApplicants: (recruiterId) => apiClient.get(`/application/recruiter/${recruiterId}`),
  getApplicants: (jobId) => apiClient.get(`/application/job/${jobId}`),
  updateApplicationStatus: (appId, statusData) => apiClient.patch(`/application/${appId}/status`, statusData),
};

// Job Seeker API endpoints
export const jobService = {
  getJobs: (params) => apiClient.get("/job", { params }),
  getJobById: (jobId) => apiClient.get(`/job/${jobId}`),
  applyForJob: (appData) => apiClient.post("/application", appData),
  getApplications: (userId) => apiClient.get(`/application/user/${userId}`),
  revokeApplication: (id) => apiClient.delete(`/application/${id}`),
};
