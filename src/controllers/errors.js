export const getCustomErrorHandler = (_request, _response, next) => {
  const err = new Error('Custom error for testing');

  err.status = 500;

  next(err);
};
