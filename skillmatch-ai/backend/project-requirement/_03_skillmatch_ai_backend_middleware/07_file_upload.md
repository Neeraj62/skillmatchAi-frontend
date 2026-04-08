# 📁 File Upload Middleware (Multer)

> **Status:** ⚠️ Partial — needs MIME type validation and size limits
> **Package:** `multer` (already installed)
> **Why:** Secure file upload for resumes (PDF/DOCX), avatars, and company logos.

---

## Implementation
```javascript
// src/middlewares/uploadMiddleware.js
import multer from "multer";
import path from "path";

const storage = multer.memoryStorage(); // Store in memory for Cloudinary upload

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = {
    resume: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    image: ["image/jpeg", "image/png", "image/webp"],
  };
  const uploadType = req.uploadType || "resume";
  if (allowedMimeTypes[uploadType]?.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed: ${allowedMimeTypes[uploadType]?.join(", ")}`), false);
  }
};

export const uploadResume = multer({
  storage,
  fileFilter: (req, file, cb) => { req.uploadType = "resume"; fileFilter(req, file, cb); },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single("resume");

export const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => { req.uploadType = "image"; fileFilter(req, file, cb); },
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
}).single("image");
```

## Usage
```javascript
router.post("/resumes", authMiddleware, uploadResume, uploadResumeController);
router.put("/profile/avatar", authMiddleware, uploadImage, updateAvatarController);
```

## Security Checks
- ✅ MIME type validation (not just extension)
- ✅ File size limits (5MB resume, 2MB images)
- ✅ Memory storage (no temp files on disk)
- ✅ Single file upload only
