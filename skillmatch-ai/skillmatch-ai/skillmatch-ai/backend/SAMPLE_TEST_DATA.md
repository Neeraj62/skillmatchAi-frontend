# 🧪 SkillMatch AI — Sample Test Data

This document provides JSON payloads for testing all main endpoints. Use these as request bodies in Postman, Thunder Client, or cURL.

---

## 🔐 Authentication

### 1. User Signup (Candidate)
`POST /api/v1/auth/signup`
```json
{
  "name": "Ashutosh Kumar",
  "email": "ashutosh@example.com",
  "password": "SecurePass123",
  "role": "user"
}
```

### 2. Recruiter Signup
`POST /api/v1/auth/signup`
```json
{
  "name": "Jane Doe",
  "email": "jane@techcorp.com",
  "password": "SecurePass123",
  "role": "recruiter"
}
```

### 3. Login
`POST /api/v1/auth/login`
```json
{
  "email": "ashutosh@example.com",
  "password": "SecurePass123"
}
```

---

## 👤 Profiles

### 4. Create Candidate Profile
`POST /api/v1/candidate-profile`
```json
{
  "user": "65f...",
  "headline": "Frontend Developer | React | Node.js",
  "summary": "Passionate developer with 3 years of experience in building modern web applications.",
  "location": {
    "city": "Bangalore",
    "country": "India"
  },
  "phone": "+91 9876543210",
  "linkedinUrl": "https://linkedin.com/in/ashutosh",
  "githubUrl": "https://github.com/ashutosh",
  "yearsOfExperience": 3,
  "expectedSalary": 120000,
  "noticePeriod": 30
}
```

### 5. Create Recruiter Profile
`POST /api/v1/recruiter-profile`
```json
{
  "user": "65f...",
  "companyName": "TechCorp Solutions",
  "companySize": "51-200",
  "industry": "Information Technology",
  "companyWebsite": "https://techcorp.com",
  "location": "San Francisco, USA"
}
```

---

## 📄 Resumes & Jobs

### 6. Register Uploaded Resume
`POST /api/v1/resume`
```json
{
  "user": "65f...",
  "filename": "Ashutosh_Resume.pdf",
  "fileUrl": "https://res.cloudinary.com/skillmatch/ashutosh_resume.pdf",
  "fileSize": 102456,
  "fileType": "pdf",
  "isPrimary": true
}
```

### 7. Create Job Posting
`POST /api/v1/job`
```json
{
  "recruiterId": "65f...",
  "title": "Senior React Developer",
  "description": "We are looking for a skilled React developer to join our core team.",
  "requiredSkills": ["javascript", "react", "redux", "node.js"],
  "location": "Remote",
  "jobType": "full-time",
  "experienceLevel": "senior",
  "salaryMin": 150000,
  "salaryMax": 250000,
  "status": "active"
}
```

---

## 📥 Applications & Others

### 8. Apply for Job
`POST /api/v1/application`
```json
{
  "user": "65f...",
  "job": "65f...",
  "resume": "65f...",
  "coverLetter": "I am excited to apply for the Senior React Developer position."
}
```

### 9. Add Candidate Skill
`POST /api/v1/candidate-skill`
```json
{
  "candidateProfile": "65f...",
  "skillName": "javascript",
  "proficiencyLevel": "expert"
}
```

### 10. Add Candidate Education
`POST /api/v1/candidate-education`
```json
{
  "candidateProfile": "65f...",
  "degree": "B.Tech",
  "institution": "IIT Delhi",
  "fieldOfStudy": "Computer Science",
  "startYear": 2018,
  "endYear": 2022,
  "grade": "9.0 CGPA"
}
```

### 11. Add Candidate Experience
`POST /api/v1/candidate-experience`
```json
{
  "candidateProfile": "65f...",
  "jobTitle": "Software Engineer",
  "company": "Tech Solutions Ltd",
  "startDate": "2022-06-01",
  "endDate": null,
  "isCurrent": true,
  "description": "Developing React-based dashboards and Node.js microservices."
}
```
