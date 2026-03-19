export const errorHandleMiddleware = (error, _request, response, _next) => {
  console.error(error.stack);

  response.status(500).send({
    message: error.message || 'Internal server error',
    stack: error.stack,
  });
};
