import { transactions as mockTransactions } from '../mocks/transactions.js';

export const postTransactionsHandler = (_request, response) => {
  response.end('Post Transactions Handler');
};

export const getTransactionsHandler = (_request, response) => {
  response.send(`Get Transactions`);
};

export const getTransactionsByIdHandler = (request, response) => {
  const userId = request.params.transactionId || 'Unknown Transaction';
  response.end(`Get Transactions By ID Handler. Transaction ID: ${userId}`);
};

export const deleteTransactionsByIdHandler = (request, response) => {
  const userId = request.params.transactionId || 'Unknown Transaction';
  response.end(`Delete Transactions By ID Handler. Transaction ID: ${userId}`);
};

export const putTransactionsByIdHandler = (request, response) => {
  const userId = request.params.transactionId || 'Unknown Transaction';
  response.end(`Put Transactions By ID Handler. Transaction ID: ${userId}`);
};
