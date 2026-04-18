# Phase 5: AI Resume Screening Engine (MVP 5)

> **Duration:** Week 7-8 | **Goal:** AI-powered resume parsing, skill extraction, job matching

---

## Tasks

### Text Extraction
- [ ] **5.1** Create `src/utils/fileParser.js`
  - `extractTextFromPdf(fileBuffer)` using `pdf-parse`
  - `extractTextFromDocx(fileBuffer)` using `mammoth`
  - `detectFileType(originalname)` → 'pdf' | 'docx' | 'unsupported'
  - `extractResumeText(fileBuffer, originalname)` — dispatcher

### AI Service
- [ ] **5.2** Create `src/services/aiPrompts.js`
  - System prompt for resume parsing
  - System prompt for job matching
  - Output JSON schema definitions

- [ ] **5.3** Create `src/services/aiService.js`
  - `parseResumeWithAI(resumeText)` — calls OpenAI GPT-4o-mini
  - `computeMatchScore(candidate, job)` — calls OpenAI for scoring
  - Retry logic (3 retries, exponential backoff)
  - JSON response parsing and validation

### Fallback Engine
- [ ] **5.4** Create `src/services/keywordMatcher.js`
  - TF-IDF vectorization using `natural` package
  - Cosine similarity scoring using `ml-distance`
  - Skills overlap ratio computation
  - Used when AI budget is exceeded

### Bull Queue Setup
- [ ] **5.5** Create `src/config/redis.js` — Redis connection
- [ ] **5.6** Create `src/queues/resumeQueue.js` — resume parsing queue
- [ ] **5.7** Create `src/queues/matchQueue.js` — match scoring queue
- [ ] **5.8** Create `src/queues/resumeProcessor.js`
  - Download resume from Cloudinary
  - Extract text → call AI parser → save results to `resumes` collection
  - Trigger match scoring for all active jobs
- [ ] **5.9** Create `src/queues/matchProcessor.js`
  - Compute match score for candidate × job pair
  - Save to `applications.aiMatchScore` + `aiMatchBreakdown`

### Models
- [ ] **5.10** Create `src/modules/skill/skill.model.js` — master skills dictionary
- [ ] **5.11** Create `src/modules/ai/aiUsageLog.model.js` — cost tracking
- [ ] **5.12** Create seed script for common skills with aliases

### Candidate Ranking
- [ ] **5.13** Implement `rankCandidates(jobId)` function
  - Sort applicants by `aiMatchScore DESC` → assign rank numbers

### Job Recommendations
- [ ] **5.14** Implement `GET /api/v1/user/recommended-jobs`
  - Fetch user's primary resume AI skills
  - Match against active jobs → return top 10

### Cost Management
- [ ] **5.15** Implement monthly budget check before each AI call
  - Query `ai_usage_logs` for current month total
  - If ≥ ₹2,500 → fallback to keyword matching
- [ ] **5.16** Implement `GET /api/v1/admin/ai-usage` — cost report

### Skills Autocomplete
- [ ] **5.17** Implement `GET /api/v1/skills?q=` — search skills

---

## Acceptance Criteria
- [ ] PDF/DOCX upload triggers AI parsing within 30 seconds
- [ ] AI parser extracts skills, experience, education, summary
- [ ] Match score (0-100) is computed when user applies to a job
- [ ] Score breakdown shows matched vs missing skills
- [ ] Fallback keyword matching works when API is unavailable
- [ ] Cost tracking prevents budget overrun
