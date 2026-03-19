import express from 'express';

import {
  getFilesFormHandler,
  postFilesFormHandler,
} from '../controllers/files.js';

const filesRouter = express.Router();

filesRouter.route('/').get(getFilesFormHandler).post(postFilesFormHandler);

export default filesRouter;
