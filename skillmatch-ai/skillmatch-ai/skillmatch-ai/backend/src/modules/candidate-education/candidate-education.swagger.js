/**
 * @swagger
 * /api/v1/candidate-education:
 *   post:
 *     summary: Add education entry to candidate profile
 *     tags: [CandidateEducation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandidateEducation'
 *     responses:
 *       201:
 *         description: Education added successfully
 *
 * /api/v1/candidate-education/profile/{profileId}:
 *   get:
 *     summary: Get all education entries for a candidate profile
 *     tags: [CandidateEducation]
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
 *         description: List of education entries
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidateEducation:
 *       type: object
 *       properties:
 *         candidateProfile:
 *           type: string
 *         degree:
 *           type: string
 *         institution:
 *           type: string
 *         fieldOfStudy:
 *           type: string
 *         startYear:
 *           type: number
 *         endYear:
 *           type: number
 *         grade:
 *           type: string
 */
