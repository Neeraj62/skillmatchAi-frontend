# 🏢 Recruiter Profile APIs

> **Module:** Recruiter Dashboard — Company Profile Setup
> **Base Route:** `/api/v1/recruiter/profile`
> **Auth Required:** ✅ Bearer JWT (role: `recruiter`)
> **Purpose:** Create and manage the recruiter's company profile. Must be set up before posting jobs.

---

## 1. GET `/api/v1/recruiter/profile`
| Purpose | Return recruiter's company profile |
|---------|----------------------------------|
| Collections | `recruiter_profiles` (find by `{ user: req.user.id }`) |
| Populate | `.populate("user", "name email")` |
| Related APIs | Called on recruiter dashboard load |

---

## 2. POST `/api/v1/recruiter/profile`
| Purpose | Create company profile (first-time setup after signup as recruiter) |
|---------|---------------------------------------------------------------------|
| Collections | `recruiter_profiles` (creates with `user: req.user.id`) |
| ObjectId Link | `recruiter_profiles.user → users._id` |
| Related APIs | Must be completed before `POST /recruiter/jobs` |

**Request Body:**
```json
{
  "companyName": "TechCorp Solutions",
  "industry": "Information Technology",
  "companySize": "51-200",
  "companyWebsite": "https://techcorp.in",
  "companyDescription": "Leading tech solutions company...",
  "location": "Bangalore, India"
}
```

---

## 3. PUT `/api/v1/recruiter/profile`
| Purpose | Update company profile details |
|---------|-------------------------------|
| Collections | `recruiter_profiles` (update by `{ user: req.user.id }`) |

---

## 4. PUT `/api/v1/recruiter/profile/logo`
| Purpose | Upload/update company logo image |
|---------|--------------------------------|
| Collections | `recruiter_profiles` (update `companyLogoUrl`) |
| File Handling | `multer` middleware → Cloudinary → returns URL |
| Related APIs | Logo appears on all job cards posted by this recruiter |

---

## 🔗 How These Connect

```
POST /auth/signup (role: "recruiter")
  └── POST /recruiter/profile (creates recruiter_profiles with user → users._id)
      └── POST /recruiter/jobs (requires profile to exist first)
          └── Job cards display companyName + companyLogoUrl from recruiter_profiles
```
