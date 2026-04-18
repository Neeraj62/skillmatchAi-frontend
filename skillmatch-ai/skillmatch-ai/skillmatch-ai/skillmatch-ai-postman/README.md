# 📬 SkillMatch AI — Postman API Test Collection

## Quick Import

1. Open **Postman**
2. Click **Import** (top-left)
3. Drag & drop `SkillMatch-AI.postman_collection.json` or browse to select it
4. Done! All 13 modules are ready to test ✅

## Collection Variables

| Variable | Default | Description |
|---|---|---|
| `baseUrl` | `http://localhost:8080` | API base URL |
| `authToken` | _(auto-set on login)_ | JWT token |
| `userId` | _(auto-set on login)_ | Logged-in user ID |
| `candidateProfileId` | _(auto-set)_ | Candidate profile ID |
| `recruiterProfileId` | _(auto-set)_ | Recruiter profile ID |
| `jobId` | _(auto-set)_ | Job posting ID |
| `resumeId` | _(auto-set)_ | Resume ID |
| `applicationId` | _(auto-set)_ | Application ID |
| `notificationId` | _(manual)_ | Notification ID |

> **Tip:** Run **Login** first — it auto-saves `authToken` and `userId` for all subsequent requests.

## Modules (27 Requests)

| # | Module | Requests |
|---|---|---|
| 1 | 🔐 Auth | Signup (Candidate), Signup (Recruiter), Login, Logout |
| 2 | 👥 Users | Get All Users |
| 3 | 👤 Candidate Profile | Create Profile, Get Profile |
| 4 | 🏢 Recruiter Profile | Create Profile, Get Profile |
| 5 | 🛠️ Candidate Skills | Add Skill, Get by Profile |
| 6 | 🎓 Candidate Education | Add Education, Get by Profile |
| 7 | 💼 Candidate Experience | Add Experience, Get by Profile |
| 8 | 📄 Resume | Upload Resume, Get by User |
| 9 | 💻 Jobs | Create Job, Get All Jobs |
| 10 | 📥 Applications | Apply for Job, Get by Job |
| 11 | 🔔 Notifications | Get by User, Mark as Read |
| 12 | 🔍 Skills Search | Search Skills |
| 13 | 🤖 AI Usage Logs | Get Logs |

## Recommended Test Flow

```
1. Signup (Candidate) → 2. Login → 3. Create Candidate Profile
→ 4. Add Skills → 5. Add Education → 6. Add Experience
→ 7. Upload Resume → 8. Create Job → 9. Apply for Job
→ 10. Get Notifications → 11. Search Skills → 12. Get AI Logs
```
