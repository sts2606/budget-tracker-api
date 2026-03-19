import express from 'express';

import {
  getTransactionsByIdHandler,
  getTransactionsHandler,
  postTransactionsHandler,
  putTransactionsByIdHandler,
  deleteTransactionsByIdHandler,
} from '../controllers/transactions.js';

const transactionsRouter = express.Router();

transactionsRouter
  .route('/')
  .get(getTransactionsHandler)
  .post(postTransactionsHandler);

transactionsRouter
  .route('/:transactionId')
  .get(getTransactionsByIdHandler)
  .delete(deleteTransactionsByIdHandler)
  .put(putTransactionsByIdHandler);

export default transactionsRouter;
