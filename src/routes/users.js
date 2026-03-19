import express from 'express';

import {
  getUserByIdHandler,
  getUsersHandler,
  postUsersHandler,
  deleteUserByIdHandler,
  putUserByIdHandler,
} from '../controllers/users.js';

import {
  validateUsersPost,
  validateUsersPut,
  validateUsersPutParams,
} from '../validators/users.js';

const usersRouter = express.Router();

usersRouter
  .route('/')
  .get(getUsersHandler)
  .post(validateUsersPost, postUsersHandler);

usersRouter
  .route('/:userId')
  .get(getUserByIdHandler)
  .delete(deleteUserByIdHandler)
  .put(validateUsersPutParams, validateUsersPut, putUserByIdHandler);

export default usersRouter;
