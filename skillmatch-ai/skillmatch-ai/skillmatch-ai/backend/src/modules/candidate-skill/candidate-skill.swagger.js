/**
 * @swagger
 * /api/v1/candidate-skill:
 *   post:
 *     summary: Add a new skill to candidate profile
 *     tags: [CandidateSkill]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CandidateSkill'
 *     responses:
 *       201:
 *         description: Skill added successfully
 *
 * /api/v1/candidate-skill/profile/{profileId}:
 *   get:
 *     summary: Get all skills for a candidate profile
 *     tags: [CandidateSkill]
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
 *         description: List of candidate skills
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CandidateSkill:
 *       type: object
 *       properties:
 *         candidateProfile:
 *           type: string
 *         skillName:
 *           type: string
 *         proficiencyLevel:
 *           type: string
 *           enum: [beginner, intermediate, expert]
 */
