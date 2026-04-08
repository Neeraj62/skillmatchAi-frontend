/**
 * @swagger
 * /api/v1/application:
 *   post:
 *     summary: Apply for a job
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
 *         description: Applied successfully
 *
 * /api/v1/application/job/{jobId}:
 *   get:
 *     summary: Get all applications for a specific job
 *     tags: [Application]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of applications
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *         job:
 *           type: string
 *         resume:
 *           type: string
 *         status:
 *           type: string
 *           enum: [applied, screening, shortlisted, interview, offered, rejected]
 *         aiMatchScore:
 *           type: number
 */
