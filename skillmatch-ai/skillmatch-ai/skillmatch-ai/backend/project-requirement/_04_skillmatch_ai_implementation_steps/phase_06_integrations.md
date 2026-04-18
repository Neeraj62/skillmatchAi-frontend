# Phase 6: Third-Party Integrations (MVP 6)

> **Duration:** Week 9 | **Goal:** Cloudinary storage, Email service, Notifications

---

## Tasks

### Cloudinary Storage Service
- [ ] **6.1** Update `src/utils/cloudinary.js` with full service
  - `uploadToCloudinary(fileBuffer, folder)` → returns URL
  - `deleteFromCloudinary(publicId)` → removes file
  - Folder structure: `/resumes/{userId}/`, `/avatars/{userId}/`, `/logos/{recruiterId}/`

### Email Service
- [ ] **6.2** Install email package: `npm install resend` (or `nodemailer`)
- [ ] **6.3** Create `src/services/emailService.js`
  - `sendEmail(to, subject, htmlBody)` — generic sender
  - `sendWelcomeEmail(user)` — on signup
  - `sendApplicationConfirmation(user, job)` — on apply
  - `sendStatusUpdateEmail(user, job, newStatus)` — on status change
  - `sendJobMatchNotification(user, topJobs)` — weekly digest
- [ ] **6.4** Create HTML email templates in `src/templates/`
  - `welcome.html`, `application_confirmation.html`, `status_update.html`
- [ ] **6.5** Create `src/queues/emailQueue.js` — async email sending via Bull

### Notification System
- [ ] **6.6** Create `src/modules/notification/notification.model.js`
- [ ] **6.7** Create `src/modules/notification/notification.controller.js`
  - `GET /api/v1/notifications` — list with unread count
  - `PATCH /api/v1/notifications/:id/read`
  - `PATCH /api/v1/notifications/read-all`
- [ ] **6.8** Create notification helper: `createNotification(userId, type, title, message, entityRef)`
- [ ] **6.9** Integrate notification creation into:
  - Auth signup, Job apply, Status change, Resume AI done

### Environment & Config
- [ ] **6.10** Update `.env.example` with all third-party keys
- [ ] **6.11** Add budget monitoring: alert admin at 80% of monthly AI spend

---

## Acceptance Criteria
- [ ] File uploads work for resumes, avatars, logos via Cloudinary
- [ ] Welcome email sent on signup
- [ ] Application confirmation email sent on apply
- [ ] Status change email sent when recruiter updates status
- [ ] In-app notifications appear in dashboard with unread count
- [ ] Monthly AI cost stays within budget
