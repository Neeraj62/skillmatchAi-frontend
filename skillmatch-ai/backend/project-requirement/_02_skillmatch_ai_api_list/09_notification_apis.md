# 🔔 Notification APIs

> **Module:** In-App Notifications
> **Base Route:** `/api/v1/notifications`
> **Auth Required:** ✅ Bearer JWT (any role)

---

## 1. GET `/api/v1/notifications`
| Purpose | List user's notifications (newest first) |
|---------|----------------------------------------|
| Collections | `notifications` (find by `{ user: req.user.id }`) |
| Query Params | `isRead` (boolean), `page`, `limit` |
| Returns | Notifications array + `unreadCount` |

## 2. PATCH `/api/v1/notifications/:id/read`
| Purpose | Mark a single notification as read |
|---------|----------------------------------|
| Collections | `notifications` (update `isRead: true`) |

## 3. PATCH `/api/v1/notifications/read-all`
| Purpose | Mark all notifications as read |
|---------|-------------------------------|
| Collections | `notifications` (updateMany for current user) |

---

## 🔗 How Notifications Are Created (Side Effects)

| Trigger | API/Service | Type | Recipient |
|---------|-------------|------|-----------|
| Signup | `POST /auth/signup` | `welcome` | New user |
| Apply to job | `POST /jobs/:id/apply` | `new_applicant` | Recruiter |
| AI analysis done | Bull `resumeQueue` worker | `resume_analyzed` | User |
| Status changed | `PATCH .../status` | `application_status_change` | User |
| AI job match | Bull `matchQueue` worker | `job_recommendation` | User |
