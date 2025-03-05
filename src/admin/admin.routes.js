import { Router } from "express"
import { getAdminById, getAdmins, deleteAdmin, updatePassword, updateAdmin, updateProfilePicture } from "./admin.controller.js"
import { getAdminByIdValidator, deleteAdminValidator, updatePasswordValidator, updateAdminValidator, updateProfilePictureValidator } from "../middlewares/admin-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /findAdmin/{aid}:
 *   get:
 *     summary: Get an admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: Admin found
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Error retrieving admin
 */
router.get("/findAdmin/:aid", getAdminByIdValidator, getAdminById)

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of admins
 *       500:
 *         description: Error retrieving admins
 */
router.get("/", getAdmins)

/**
 * @swagger
 * /deleteAdmin/{aid}:
 *   delete:
 *     summary: Delete an admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *       500:
 *         description: Error deleting admin
 */
router.delete("/deleteAdmin/:aid", deleteAdminValidator, deleteAdmin)

/**
 * @swagger
 * /updatePassword/{aid}:
 *   patch:
 *     summary: Update an admin's password
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: The admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: New password cannot be the same as the old password
 *       500:
 *         description: Error updating password
 */
router.patch("/updatePassword/:aid", updatePasswordValidator, updatePassword)

/**
 * @swagger
 * /updateAdmin/{aid}:
 *   put:
 *     summary: Update an admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: The admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       500:
 *         description: Error updating admin
 */
router.put("/updateAdmin/:aid", updateAdminValidator, updateAdmin)

/**
 * @swagger
 * /updateProfilePicture/{aid}:
 *   patch:
 *     summary: Update an admin's profile picture
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *         description: The admin ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       400:
 *         description: No file in the request
 *       500:
 *         description: Error updating profile picture
 */
router.patch("/updateProfilePicture/:aid", uploadProfilePicture.single("profilePicture"), updateProfilePictureValidator, updateProfilePicture)

export default router
