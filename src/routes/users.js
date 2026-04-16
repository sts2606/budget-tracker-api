import express from 'express';

import {
  getUserByIdHandler,
  getUsersHandler,
  postUsersHandler,
  deleteUserByIdHandler,
  putUserByIdHandler,
  putUserByEmailHandler,
  getUsersSummaryHandler,
} from '../controllers/users.js';

import {
  validateUsersPost,
  validateUsersPut,
  validateUsersPutParams,
} from '../validators/users.js';

import { isAuthenticated } from '../middleware/auth.js';

const usersRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 */
usersRouter
  .route('/')
  .get(isAuthenticated, getUsersHandler)
  .post(validateUsersPost, postUsersHandler);

/**
 * @swagger
 * /users/summary:
 *   get:
 *     summary: Get a summary of users with their total transactions amount
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A summary of users with their total transactions amount
 *         content:
 *           application/json:
 */
usersRouter.route('/summary').get(getUsersSummaryHandler);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object
 *
 *   post:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               limit:
 *                 type: number
 *               currency:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated user object
 *
 *   put:
 *     summary: Update a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 */
usersRouter
  .route('/:userId')
  .get(getUserByIdHandler)
  .delete(deleteUserByIdHandler)
  .put(validateUsersPutParams, validateUsersPut, putUserByIdHandler);

usersRouter
  .route('/email/:email')
  .put(validateUsersPutParams, validateUsersPut, putUserByEmailHandler);

export default usersRouter;
