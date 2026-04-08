/**
 * @swagger
 * /api/v1/candidate-experience:
 *   post:
 *     summary: Add experience entry to candidate profile
 *     tags: [CandidateExperience]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandidateExperience'
 *     responses:
 *       201:
 *         description: Experience added successfully
 *
 * /api/v1/candidate-experience/profile/{profileId}:
 *   get:
 *     summary: Get all experience entries for a candidate profile
 *     tags: [CandidateExperience]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of experience entries
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidateExperience:
 *       type: object
 *       properties:
 *         candidateProfile:
 *           type: string
 *         jobTitle:
 *           type: string
 *         company:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         isCurrent:
 *           type: boolean
 *         description:
 *           type: string
 */
