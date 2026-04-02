import express from 'express';

import {
  getUserByIdHandler,
  getUsersHandler,
  postUsersHandler,
  deleteUserByIdHandler,
  putUserByIdHandler,
  putUserByEmailHandler,
} from '../controllers/users.js';

import {
  validateUsersPost,
  validateUsersPut,
  validateUsersPutParams,
} from '../validators/users.js';

import { isAuthenticated } from '../middleware/auth.js';

const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(isAuthenticated, getUsersHandler)
  .post(validateUsersPost, postUsersHandler);

usersRouter
  .route('/:userId')
  .get(getUserByIdHandler)
  .delete(deleteUserByIdHandler)
  .put(validateUsersPutParams, validateUsersPut, putUserByIdHandler);

usersRouter
  .route('/email/:email')
  .put(validateUsersPutParams, validateUsersPut, putUserByEmailHandler);

export default usersRouter;
