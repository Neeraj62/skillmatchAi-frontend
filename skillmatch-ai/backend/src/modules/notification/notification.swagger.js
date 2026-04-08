/**
 * @swagger
 * /api/v1/notification/user/{userId}:
 *   get:
 *     summary: Get all notifications for a user
 *     tags: [Notification]
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
 *         description: List of notifications
 *
 * /api/v1/notification/{id}/read:
 *   patch:
 *     summary: Mark a notification as read
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *         type:
 *           type: string
 *           enum: [application_status_change, new_applicant, resume_analyzed, job_recommendation, welcome, system]
 *         title:
 *           type: string
 *         message:
 *           type: string
 *         isRead:
 *           type: boolean
 */
