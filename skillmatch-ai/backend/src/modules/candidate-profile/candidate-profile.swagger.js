/**
 * @swagger
 * /api/v1/candidate-profile:
 *   post:
 *     summary: Create or update candidate profile
 *     tags: [CandidateProfile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandidateProfile'
 *     responses:
 *       201:
 *         description: Profile created/updated successfully
 *
 * /api/v1/candidate-profile/{userId}:
 *   get:
 *     summary: Get candidate profile by user ID
 *     tags: [CandidateProfile]
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
 *         description: Candidate profile details
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidateProfile:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *         headline:
 *           type: string
 *         summary:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *             country:
 *               type: string
 *         phone:
 *           type: string
 *         linkedinUrl:
 *           type: string
 *         githubUrl:
 *           type: string
 *         portfolioUrl:
 *           type: string
 *         yearsOfExperience:
 *           type: number
 *         currentSalary:
 *           type: number
 *         expectedSalary:
 *           type: number
 *         noticePeriod:
 *           type: number
 *         avatarUrl:
 *           type: string
 */
