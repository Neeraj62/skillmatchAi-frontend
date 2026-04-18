/**
 * @swagger
 * /api/v1/job:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *
 *   get:
 *     summary: Get all active job postings
 *     tags: [Job]
 *     responses:
 *       200:
 *         description: List of active jobs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         recruiterId:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         requiredSkills:
 *           type: array
 *           items:
 *             type: string
 *         location:
 *           type: string
 *         jobType:
 *           type: string
 *           enum: [full-time, part-time, contract, internship, remote]
 *         experienceLevel:
 *           type: string
 *           enum: [entry, mid, senior, lead, executive]
 *         status:
 *           type: string
 *           enum: [draft, active, paused, closed]
 */
