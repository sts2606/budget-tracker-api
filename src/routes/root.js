import { getRootHandler } from '../controllers/root.js';
import express from 'express';

const rootRouter = express.Router();

rootRouter.route('/').get(getRootHandler);

export default rootRouter;
