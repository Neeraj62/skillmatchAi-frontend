/**
 * @swagger
 * /api/v1/resume:
 *   post:
 *     summary: Upload and register a new resume
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resume'
 *     responses:
 *       201:
 *         description: Resume registered successfully
 *
 * /api/v1/resume/user/{userId}:
 *   get:
 *     summary: Get all resumes for a user
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of user resumes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Resume:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *         filename:
 *           type: string
 *         fileUrl:
 *           type: string
 *         fileSize:
 *           type: number
 *         fileType:
 *           type: string
 *           enum: [pdf, docx]
 *         aiParseStatus:
 *           type: string
 *           enum: [pending, processing, analyzed, failed]
 *         isPrimary:
 *           type: boolean
 */
