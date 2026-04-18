# 👤 User Profile & Settings APIs

> **Module:** User (Job Seeker) Dashboard — Profile Management
> **Base Route:** `/api/v1/user`
> **Auth Required:** ✅ Bearer JWT (role: `user`)
> **Purpose:** Complete CRUD for candidate profile, skills, education, experience, and account settings.

---

## 1. GET `/api/v1/user/profile`
| Purpose | Return current user's candidate profile |
|---------|----------------------------------------|
| Collections | `candidate_profiles` (find by `{ user: req.user.id }`) |
| Populate | `.populate("user", "name email role")` |
| Related APIs | Called on `/dashboard/profile` page load |

---

## 2. POST `/api/v1/user/profile`
| Purpose | Create candidate profile (first-time setup after signup) |
|---------|--------------------------------------------------------|
| Collections | `candidate_profiles` (creates new doc with `user: req.user.id`) |
| ObjectId Link | `candidate_profiles.user → users._id` |
| Related APIs | Triggered after `POST /auth/signup` when role = `user` |

---

## 3. PUT `/api/v1/user/profile`
| Purpose | Update profile fields (headline, summary, location, URLs, salary, etc.) |
|---------|------------------------------------------------------------------------|
| Collections | `candidate_profiles` (update by `{ user: req.user.id }`) |
| Related APIs | Recalculates `profileCompletionPercentage` on save |

---

## 4. PUT `/api/v1/user/profile/avatar`
| Purpose | Upload/update profile avatar image |
|---------|----------------------------------|
| Collections | `candidate_profiles` (update `avatarUrl`) |
| File Handling | `multer` middleware → Cloudinary upload → returns URL |
| Related APIs | Avatar URL stored in `candidate_profiles.avatarUrl` |

---

## 5. POST `/api/v1/user/profile/skills`
| Purpose | Add a new skill to candidate profile |
|---------|--------------------------------------|
| Collections | `candidate_skills` (creates doc with `candidateProfile: profileId`) |
| ObjectId Link | `candidate_skills.candidateProfile → candidate_profiles._id` |
| Related APIs | Skills feed into AI Match Score engine (MVP5) |

**Request Body:**
```json
{ "skillName": "react", "proficiencyLevel": "expert" }
```

---

## 6. DELETE `/api/v1/user/profile/skills/:id`
| Purpose | Remove a skill from candidate profile |
|---------|---------------------------------------|
| Collections | `candidate_skills` (delete by `_id`) |
| Validation | Verify skill belongs to logged-in user's profile |

---

## 7. POST `/api/v1/user/profile/education`
| Purpose | Add education entry |
|---------|---------------------|
| Collections | `candidate_educations` (creates doc) |
| ObjectId Link | `candidate_educations.candidateProfile → candidate_profiles._id` |

**Request Body:**
```json
{ "degree": "B.Tech", "institution": "IIT Delhi", "fieldOfStudy": "Computer Science", "startYear": 2020, "endYear": 2024, "grade": "8.5 CGPA" }
```

---

## 8. PUT `/api/v1/user/profile/education/:id`
| Purpose | Update an education entry |
|---------|--------------------------|
| Collections | `candidate_educations` (update by `_id`) |

---

## 9. DELETE `/api/v1/user/profile/education/:id`
| Purpose | Remove an education entry |
|---------|--------------------------|
| Collections | `candidate_educations` (delete by `_id`) |

---

## 10. POST `/api/v1/user/profile/experience`
| Purpose | Add work experience entry |
|---------|--------------------------|
| Collections | `candidate_experiences` (creates doc) |
| ObjectId Link | `candidate_experiences.candidateProfile → candidate_profiles._id` |

**Request Body:**
```json
{ "jobTitle": "Frontend Developer", "company": "TCS", "startDate": "2022-06-01", "endDate": null, "isCurrent": true, "description": "Building React apps..." }
```

---

## 11. PUT `/api/v1/user/profile/experience/:id`
| Purpose | Update a work experience entry |
|---------|-------------------------------|
| Collections | `candidate_experiences` (update by `_id`) |

---

## 12. DELETE `/api/v1/user/profile/experience/:id`
| Purpose | Remove a work experience entry |
|---------|-------------------------------|
| Collections | `candidate_experiences` (delete by `_id`) |

---

## 13. GET `/api/v1/user/settings`
| Purpose | Return account settings (notifications, privacy) |
|---------|------------------------------------------------|
| Collections | `users` + `candidate_profiles` |

---

## 14. PUT `/api/v1/user/settings`
| Purpose | Update notification and privacy preferences |
|---------|---------------------------------------------|
| Collections | `users` / `candidate_profiles` |

---

## 15. PUT `/api/v1/user/settings/password`
| Purpose | Change password (requires old password verification) |
|---------|-----------------------------------------------------|
| Collections | `users` (verify old hash → bcrypt new password) |
| Security | Must compare old password before allowing change |

**Request Body:**
```json
{ "oldPassword": "OldPass123", "newPassword": "NewPass456" }
```

---

## 🔗 How These APIs Connect

```
POST /auth/signup (creates users._id)
  └── POST /user/profile (creates candidate_profiles with user: users._id)
      ├── POST /user/profile/skills (adds to candidate_skills with candidateProfile: profile._id)
      ├── POST /user/profile/education (adds to candidate_educations with candidateProfile: profile._id)
      ├── POST /user/profile/experience (adds to candidate_experiences with candidateProfile: profile._id)
      └── PUT /user/profile/avatar (uploads to Cloudinary, saves URL in candidate_profiles)

GET /user/profile → reads candidate_profiles + populates user data from users
```
