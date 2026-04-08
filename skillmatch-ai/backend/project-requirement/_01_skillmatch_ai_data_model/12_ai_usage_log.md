# 📄 Collection: `ai_usage_logs`

> **Purpose:** Tracks every OpenAI API call with token count and estimated cost. Used for budget enforcement (hard stop at ₹2,500/month) and admin cost reporting. When the monthly budget is exceeded, the system falls back to keyword-based TF-IDF matching.

---

## Mongoose Schema

```javascript
import mongoose from "mongoose";

const aiUsageLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      // Which user triggered the AI call (can be null for system-level jobs)
    },
    taskType: {
      type: String,
      enum: ["resume_parse", "job_match", "recommendation"],
      required: true,
    },
    model: {
      type: String,
      default: "gpt-4o-mini",
      // e.g., "gpt-4o-mini", "gpt-4o"
    },
    inputTokens: {
      type: Number,
      required: true,
      min: 0,
    },
    outputTokens: {
      type: Number,
      required: true,
      min: 0,
    },
    totalTokens: {
      type: Number,
      required: true,
      min: 0,
    },
    costUsd: {
      type: Number,
      required: true,
      min: 0,
      // Estimated cost in USD based on model pricing
      // gpt-4o-mini: $0.15/1M input, $0.60/1M output
    },
    costInr: {
      type: Number,
      min: 0,
      // Converted to INR for budget tracking
    },
    success: {
      type: Boolean,
      default: true,
    },
    errorMessage: {
      type: String,
      // Only populated if success: false
    },
    relatedEntityId: {
      type: mongoose.Schema.Types.ObjectId,
      // Could reference a resume, application, etc.
    },
    relatedEntityType: {
      type: String,
      enum: ["resume", "application"],
    },
  },
  {
    timestamps: true,
  }
);

// Index for monthly aggregation queries
aiUsageLogSchema.index({ createdAt: -1 });
aiUsageLogSchema.index({ taskType: 1, createdAt: -1 });

const AiUsageLog = mongoose.model("AiUsageLog", aiUsageLogSchema);
export default AiUsageLog;
```

---

## Field Reference

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | Auto | Primary key |
| `user` | ObjectId (ref: User) | No | — | User who triggered the AI call |
| `taskType` | String (enum) | ✅ | — | resume_parse / job_match / recommendation |
| `model` | String | No | `"gpt-4o-mini"` | OpenAI model used |
| `inputTokens` | Number | ✅ | — | Tokens in the prompt |
| `outputTokens` | Number | ✅ | — | Tokens in the response |
| `totalTokens` | Number | ✅ | — | inputTokens + outputTokens |
| `costUsd` | Number | ✅ | — | Estimated cost in USD |
| `costInr` | Number | No | — | Estimated cost in INR |
| `success` | Boolean | No | `true` | Whether the API call succeeded |
| `errorMessage` | String | No | — | Error details if failed |
| `relatedEntityId` | ObjectId | No | — | ID of resume or application |
| `relatedEntityType` | String (enum) | No | — | What entity this log relates to |
| `createdAt` | Date | Auto | Auto | Timestamp |
| `updatedAt` | Date | Auto | Auto | Timestamp |

---

## 🔗 Relationships

| Direction | Related Collection | Type | FK Field |
|-----------|--------------------|------|----------|
| ⬆️ Parent | `users` | Many-to-One | `this.user → users._id` |
| 🔗 Dynamic Ref | `resumes` / `applications` | Polymorphic | `relatedEntityId` |

---

## 📌 Cost Computation Example

```javascript
// GPT-4o-mini pricing
const PRICING = {
  "gpt-4o-mini": {
    inputPer1MTokens: 0.15,  // $0.15/1M input tokens
    outputPer1MTokens: 0.60, // $0.60/1M output tokens
  },
};

function calculateCost(model, inputTokens, outputTokens) {
  const pricing = PRICING[model];
  const inputCost = (inputTokens / 1_000_000) * pricing.inputPer1MTokens;
  const outputCost = (outputTokens / 1_000_000) * pricing.outputPer1MTokens;
  return inputCost + outputCost; // Returns USD
}
```

---

## 📌 Notes

- Monthly budget query: `AiUsageLog.aggregate([ { $match: { createdAt: { $gte: startOfMonth } } }, { $group: { _id: null, totalCostInr: { $sum: "$costInr" } } } ])`.
- If `totalCostInr >= 2500`, system switches to keyword TF-IDF fallback.
- Admin endpoint `GET /api/admin/ai-usage` returns aggregated monthly cost report.
