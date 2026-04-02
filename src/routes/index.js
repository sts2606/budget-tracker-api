import usersRouter from './users.js';
import transactionsRouter from './transactions.js';
import rootRouter from './root.js';
import errorRouter from './error.js';
import express from 'express';
import filesRouter from './files.js';
import authRouter from './auth.js';

const router = express.Router();

router.use('/', rootRouter);
router.use('/users', usersRouter);
router.use('/transactions', transactionsRouter);
router.use('/error-test', errorRouter);
router.use('/files', filesRouter);
router.use('/auth', authRouter);

export default router;
