/**
 * @swagger
 * /api/v1/recruiter-profile:
 *   post:
 *     summary: Create or update recruiter profile
 *     tags: [RecruiterProfile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecruiterProfile'
 *     responses:
 *       201:
 *         description: Profile created/updated successfully
 *
 * /api/v1/recruiter-profile/{userId}:
 *   get:
 *     summary: Get recruiter profile by user ID
 *     tags: [RecruiterProfile]
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
 *         description: Recruiter profile details
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RecruiterProfile:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *         companyName:
 *           type: string
 *         companyLogoUrl:
 *           type: string
 *         companySize:
 *           type: string
 *           enum: ["1-10", "11-50", "51-200", "201-1000", "1000+"]
 *         industry:
 *           type: string
 *         companyWebsite:
 *           type: string
 *         companyDescription:
 *           type: string
 *         location:
 *           type: string
 */
