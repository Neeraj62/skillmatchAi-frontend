/**
 * @swagger
 * /api/v1/ai-usage-log:
 *   get:
 *     summary: Get all AI usage logs (Admin)
 *     tags: [AiUsageLog]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of AI usage logs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AiUsageLog:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *         taskType:
 *           type: string
 *           enum: [resume_parse, job_match, recommendation]
 *         model:
 *           type: string
 *         inputTokens:
 *           type: number
 *         outputTokens:
 *           type: number
 *         totalTokens:
 *           type: number
 *         costUsd:
 *           type: number
 *         success:
 *           type: boolean
 */
