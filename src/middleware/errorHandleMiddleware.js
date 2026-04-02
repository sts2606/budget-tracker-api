export class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ValidationError';
    this.status = status || 400;
  }
}

export const errorHandleMiddleware = (error, _request, response, _next) => {
  if (error instanceof ValidationError) {
    console.log('Before error');
    response
      .status(error.status)
      .send({ message: error.message, stack: error.stack });
  } else {
    response.status(500).send({
      message: error.message || 'Internal server error',
      stack: error.stack,
    });
  }
};
