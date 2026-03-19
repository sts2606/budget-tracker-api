export const bodyParser = (request, response, next) => {
  let apiData = '';

  request.on('data', (chunk) => {
    apiData += chunk;
  });

  request.on('end', () => {
    request.body = JSON.parse(apiData);

    // next();
  });
};
