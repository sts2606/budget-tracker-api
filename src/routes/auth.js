import express from 'express';

import {
  authRegisterHandler,
  authLoginHandler,
  authLogoutHandler,
} from '../controllers/auth.js';

import { validateUsersPost } from '../validators/users.js';

const authRouter = express.Router();

authRouter.route('/register').post(validateUsersPost, authRegisterHandler);

authRouter.route('/login').post(authLoginHandler);

authRouter.route('/logout').post(authLogoutHandler);

export default authRouter;
