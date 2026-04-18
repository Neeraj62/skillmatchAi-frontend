/**
 * @swagger
 * /api/v1/skill/search:
 *   get:
 *     summary: Search for skills by name or alias
 *     tags: [Skill]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query for skills
 *     responses:
 *       200:
 *         description: List of matching skills
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       properties:
 *         skillName:
 *           type: string
 *         displayName:
 *           type: string
 *         aliases:
 *           type: array
 *           items:
 *             type: string
 *         category:
 *           type: string
 */
