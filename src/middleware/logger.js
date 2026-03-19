export const logger = (request, response, next) => {
  console.log(`Logger, request: ${request.url}`);

  next();
};
