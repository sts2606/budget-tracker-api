import express from 'express';

import { getCustomErrorHandler } from '../controllers/errors.js';

const errorRouter = express.Router();

errorRouter.route('/').get(getCustomErrorHandler);

export default errorRouter;
