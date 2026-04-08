# 🤖 AI & Admin APIs

> **Module:** AI Usage Tracking, Skills Autocomplete, Admin Reports
> **Purpose:** Cost tracking, skill search, and admin-level analytics.

---

## 1. GET `/api/v1/skills`

| Purpose | Skills autocomplete search |
|---------|--------------------------|
| Auth | ❌ Public |
| Collections | `skills` (text search) |
| Query | `?q=jav` → returns matching skills |

**Response:** `[{ "skillName": "javascript", "displayName": "JavaScript", "category": "Programming Language" }]`

---

## 2. GET `/api/v1/admin/ai-usage`

| Purpose | Monthly AI cost report |
|---------|----------------------|
| Auth | ✅ Bearer JWT (admin) |
| Collections | `ai_usage_logs` (aggregate by month) |

**Response:**
```json
{
  "data": {
    "currentMonth": { "totalCalls": 234, "totalTokens": 450000, "totalCostInr": 380 },
    "budgetLimit": 2500,
    "budgetUsedPercent": 15.2
  }
}
```

---

## 3. GET `/api/v1/admin/dashboard`

| Purpose | Admin overview stats |
|---------|---------------------|
| Auth | ✅ Bearer JWT (admin) |
| Collections | `users`, `jobs`, `applications` (count aggregation) |

**Response:**
```json
{ "totalUsers": 150, "totalRecruiters": 25, "totalJobs": 42, "totalApplications": 380 }
```
