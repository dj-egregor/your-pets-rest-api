const express = require('express');

const validation = require('../../middlewares/validation');
const upload = require('../../middlewares/upload');
const {
    registerSchema,
    loginSchema,
    updateUserSchema,
    emailSchema,
} = require('../../schemas/users');

const { users: ctrl } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/register', validation.validate(registerSchema), ctrl.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate user and generate access token
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */
router.post('/login', validation.validate(loginSchema), ctrl.login);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user and revoke access token
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/logout', authenticate, ctrl.logout);

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get current user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/current', authenticate, ctrl.getCurrent);

/**
 * @swagger
 * /api/users:
 *   patch:
 *     summary: Update user subscription
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateUserInfo'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.patch(
    '/',
    authenticate,
    validation.validate(updateUserSchema),
    ctrl.updateUserInfo
);

/**
 * @swagger
 * /api/users/avatars:
 *   patch:
 *     summary: Update user avatar
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *             required:
 *               - avatar
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.patch(
    '/avatars',
    authenticate,
    upload.single('avatar'),
    ctrl.updateAvatar
);

module.exports = router;
